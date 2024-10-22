<script lang="ts">
  import { setContext } from "svelte";
  import HolidayComponent from "../components/holiday.svelte";
  import { holidays } from "../stores/holiday-store";
  import Dropdown from "../components/dropdown.svelte";

  export const prerender = true;

  let holidayName = "";
  function addHoliday() {
    if (!holidayName) {
      return;
    }
    holidays.update((n) => {
      return [
        ...n,
        {
          name: holidayName,
          people: [],
        },
      ];
    });
    holidayName = "";
  }

  let filters = {
    people: new Set<string>(),
  };

  function addNameFilter(personName: string) {
    filters.people.has(personName)
      ? filters.people.delete(personName)
      : filters.people.add(personName);
    filters.people = filters.people;
  }
</script>

<div>
  <div class="flex">
    <div>
      <input bind:value={holidayName} placeholder="holiday" />
      <button on:click={addHoliday}>Add holiday</button>
    </div>
    <div>Filter by person name:</div>
    <Dropdown
      values={Array.from(
        new Set(
          $holidays
            .map((h) => h.people)
            .flat(1)
            .map((p) => p.name)
        )
      )}
      onSelect={(value) => {
        addNameFilter(value);
      }}
      title={"People"}
    ></Dropdown>
  </div>
  <div>
    <ul>
      {#each $holidays as holiday, index}
        <HolidayComponent name={holiday.name} holidayIndex={index} {filters}
        ></HolidayComponent>
      {/each}
    </ul>
  </div>
</div>

<style>
  .flex {
    display: flex;
    gap: 10px;
  }
</style>
