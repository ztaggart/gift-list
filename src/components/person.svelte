<script lang="ts">
  import { holidays } from "../stores/holiday-store";
  import Gift from "./gift.svelte";

  export let name;
  export let holidayIndex: number;
  export let personIndex: number;
  let giftName = "";
  let giftPrice: number | undefined;

  function addGift() {
    if (!giftName || !giftPrice) {
      return;
    }
    const person = {
      name: giftName,
      price: giftPrice,
    };
    holidays.update((holidayArr) => {
      holidayArr[holidayIndex].people[personIndex].gifts.push(person);
      return holidayArr;
    });
    giftName = "";
    giftPrice = undefined;
  }

  $: gifts = $holidays[holidayIndex].people[personIndex].gifts;
  $: totalGiftPrice = gifts.reduce(
    (acc: number, gift: { price: number }) => acc + gift.price,
    0
  );
</script>

<li>
  <div>
    {name}
    <input bind:value={giftName} placeholder="gift name" />
    <input bind:value={giftPrice} placeholder="gift price" type="number" />
    <button on:click={addGift}>Add gift</button>
  </div>
  <ul>
    {#each gifts as gift}
      <Gift {...gift}></Gift>
    {/each}
    {#if gifts.length}
      Total price of all gifts: ${totalGiftPrice}
    {/if}
  </ul>
</li>
