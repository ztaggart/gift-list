<script lang="ts">
  import { onMount } from "svelte";

  export let values: string[];
  export let onSelect: (value: string) => void;
  export let title: string = "";
  let visibleChecklist = false;
</script>

<div
  id="checklist"
  class={`dropdown-check-list ${visibleChecklist && "visible"}`}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    class="anchor"
    on:click={() => (visibleChecklist = !visibleChecklist)}
    role="listbox"
    tabindex="0">{title}</span
  >
  <ul class="items">
    {#each values as value}
      <li>
        <input type="checkbox" on:change={() => onSelect(value)} />{value}
      </li>
    {/each}
  </ul>
</div>

<style>
  .dropdown-check-list {
    display: inline-block;
    position: relative;
  }

  .dropdown-check-list .anchor {
    position: relative;
    cursor: pointer;
    display: inline-block;
    padding: 5px 50px 5px 10px;
    border: 1px solid #ccc;
  }

  .dropdown-check-list .anchor:after {
    position: absolute;
    content: "";
    border-left: 2px solid black;
    border-top: 2px solid black;
    padding: 5px;
    right: 10px;
    top: 20%;
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }

  .dropdown-check-list .anchor:active:after {
    right: 8px;
    top: 21%;
  }

  .dropdown-check-list ul.items {
    padding: 2px;
    display: none;
    margin: 0;
    border: 1px solid #ccc;
    border-top: none;
    position: absolute;
    width: 94.5%;
    background: white;
  }

  .dropdown-check-list ul.items li {
    list-style: none;
  }

  .dropdown-check-list.visible .anchor {
    color: #0094ff;
  }

  .dropdown-check-list.visible .items {
    display: block;
  }
</style>
