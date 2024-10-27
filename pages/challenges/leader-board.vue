<!--
❌ Responsive UI
✅ Page Title
✅ Translation
❌ Animation
✅ middleware

✅ Tested on chrome
✅ Tested on firefox
✅ Tested on safari
❌ Tested on android mobile
❌ Tested on apple mobile

✅ Handle loading if data already exists
✅ Handle loading if data is empty
✅ Display data
✅ Handle empty state

✅ Api implemented
-->
<template>
  <main
    class="grid-auto gap-card container min pb-container pt-container grid-rows-[auto_auto_1fr]"
  >
    <InputButtonToggle
      :buttonOptions="seasonButtonOptions"
      v-model="seasonbutton"
      class="mb-4"
    />
    <InputButtonToggle
      :buttonOptions="buttonOptions"
      v-model="selectedbutton"
    />
    <p class="text-heading-1 mt-6 mb-12">{{ t("Headings.LeaderBoard") }}:</p>

    <SkeletonLeaderboard v-if="loading && selectedbutton != 1" />

    <!-- <LeaderboardSeasonal
      :leaderBoardList="leaderBoardList"
      v-if="selectedbutton == 0 && !loading"
    /> -->

    <LeaderboardLanguageBased
      :leaderBoardList="leaderBoardList"
      v-if="selectedbutton == 0 && !loading"
    />
    <LeaderboardChallengeBased
      :leaderBoardList="leaderBoardList"
      v-else-if="selectedbutton == 1 && !loading"
    />
    <LeaderboardOverall v-else-if="selectedbutton == 2 && !loading" />
  </main>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { useLeaderBoardList } from "~~/composables/leaderboard";
definePageMeta({
  middleware: ["auth"],
});

export default {
  head: {
    title: "Leader board",
  },
  setup() {
    const { t } = useI18n();
    const loading = ref(false);
    const leaderBoardList = useLeaderBoardList();
    const selectedbutton: any = ref(
      localStorage.getItem("selectedButtonLeaderBoard") ?? 0
    );
    const seasonbutton: any = ref(
      localStorage.getItem("seasonButtonLeaderBoard") ?? 0
    );
    const router = useRouter();
    const route = useRoute();
    let buttonOptions: any = [
      { name: "Buttons.LanguageBased" },
      { name: "Buttons.ChallengeBased" },
      { name: "Buttons.Overall" },
    ];
    let seasonButtonOptions: any = [
      { name: "Buttons.Season" },
      { name: "Buttons.AllTime" },
    ];

    watch(
      () => selectedbutton.value,
      (newValue: any, oldValue) => {
        localStorage.setItem("selectedButtonLeaderBoard", newValue);
        router.replace({
          path: route.path,
          query: {
            seasonButton: seasonbutton.value,
            selectedButton: selectedbutton.value,
          },
        });
      },
      { immediate: true }
    );
    onUnmounted(() => {
      localStorage.removeItem("selectedButtonLeaderBoard");
    });

    watch(
      () => seasonbutton.value,
      (newValue: any, oldValue) => {
        localStorage.setItem("seasonButtonLeaderBoard", newValue);
        router.replace({
          path: route.path,
          query: {
            seasonButton: seasonbutton.value,
            selectedButton: selectedbutton.value,
          },
        });
      },
      { immediate: true }
    );
    onUnmounted(() => {
      localStorage.removeItem("seasonButtonLeaderBoard");
    });

    return { buttonOptions, selectedbutton, seasonButtonOptions, seasonbutton, t, leaderBoardList, loading };
  },
};
</script>

<style scoped></style>
