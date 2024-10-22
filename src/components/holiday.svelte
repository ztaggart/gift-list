<script lang="ts">
  import Person from "./person.svelte";
  import { holidays } from "../stores/holiday-store";
  import { getContext } from "svelte";

  export let name: string;
  export let holidayIndex: number;
  export let filters: { people: Set<string> };
  let personName = "";

  function addPerson() {
    if (
      !personName ||
      $holidays[holidayIndex].people.some((p) => p.name === personName)
    ) {
      return;
    }
    holidays.update((holidayArr) => {
      holidayArr[holidayIndex].people.push({
        name: personName,
        gifts: [],
      });
      return holidayArr;
    });
    personName = "";
  }
</script>

<li>
  <div>
    {name}
    <input bind:value={personName} placeholder="person" />
    <button on:click={addPerson}>Add person</button>
  </div>
  <ul>
    {#each $holidays[holidayIndex].people as person, index}
      {#if filters.people.size < 1 || filters.people.has(person.name)}
        <Person name={person.name} {holidayIndex} personIndex={index}></Person>
      {/if}
    {/each}
  </ul>
</li>
