import { getGameAssets } from '../init/assets.init.js';
import { getStage, setStage } from '../models/stage.model.js';

export const moveStageHandler = (userId, payload) => {
  const { stages, items, itemUnlocks } = getGameAssets();

  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'no stages found for user' };
  }

  // 유저의 현재 스테이지 확인
  currentStages.sort((a, b) => a.id - b.id);
  const currentStage = currentStages[currentStages.length - 1];

  // 클라이언트 서버 비교
  if (currentStage.id !== payload.currentStage) {
    return { status: 'fail', message: 'current stage mismatch' };
  }

  const stageIndex = payload.currentStage - 1000;
  const serverTime = Date.now(); //현재 타임스탬프
  const elapsedTime = (serverTime - currentStage.timestamp) / 1000;

  // 스테이지 별 점수
  const scorePerStage =
    stages.data[payload.targetStage - 1000].score - stages.data[stageIndex].score;

  // 최고 점수 아이템을 최소 시간 생성 기준으로 모두 먹었을 경우
  const minTime = Math.floor(
    scorePerStage /
      (items.data[itemUnlocks.data[stageIndex].item_id - 1].score +
        stages.data[stageIndex].scorePerSecond),
  );

  if (elapsedTime < minTime) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }

  //현재 스테이지 저장
  setStage(userId, payload.targetStage, serverTime);

  console.log('Stage: ', getStage(userId));

  return { status: 'success' };
};
