import { getGameAssets } from '../init/assets.init.js';
import { setItem, getItem } from '../models/item.model.js';

export const getItemHandler = (userId, payload) => {
  const { items, itemUnlocks } = getGameAssets();
  const getItems = getItem(userId);
  const stageIndex = payload.currentStage - 1000;
  const itemIdIndex = payload.itemId - 1;
  const serverTime = Date.now();

  const item = getItems[getItems.length - 1];
  const elapsedTime = (serverTime - item.timestamp) / 1000;

  // 아이템 획득 시간 검증
  if (elapsedTime < 2) {
    return { status: 'fail', message: '비정상적인 아이템 획득 주기가 감지되었습니다.' };
  }

  // 스테이지에 해당하지 않는 아이템을 획득했을 경우
  if (payload.itemId > itemUnlocks.data[stageIndex].itemId) {
    return { status: 'fail', message: '현 스테이지에 존재 해서는 안될 아이템.' };
  }

  // 아이템 Score 검증
  if (items.data[itemIdIndex].score !== payload.itemScore - item.itemScore) {
    return { status: 'fail', message: '비정상적인 아이템입니다.' };
  }

  //먹은 아이템 저장
  setItem(userId, payload.itemId, serverTime, payload.itemScore);
  return { status: 'success' };
};
