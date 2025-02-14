<template>
    <div class="main-board">

        <div class="round-board child-place-center">
            <div class="title child-place-center" style="height:50%"><strong>{{ kyokuList[currentKyoku] }}</strong></div>
            <div class="child-place-center" style="height:50%">
                <div class="text" style="margin-bottom: 5px;"><strong>{{ honba }} {{ $t('message.honba', honba) }}</strong></div>
                <div class="text"><strong>{{ kyoutaku * 1000 }} {{ $t('message.deposits') }}</strong></div>
            </div>
        </div>

        <div class="child-place-center score-board bottom">
            <t-button class="riichi":theme="gameStore.getSeat(0).riichi ? 'primary' : 'light'"
                @click="onRiichi(0)">{{ $t('message.riichi')}}</t-button>
            <div class="title"><strong>{{ gameStore.getSeat(0).seat }}&nbsp;{{
                gameStore.getSeat(0).point }}</strong>
                <div class="text score-change">
                    <Transition name="slide-fade">
                        <a :style="[pointPositiveFlag[0] ? pointPositiveStyle : pointNegativeStyle]" v-if="pointChangeFlag[0]">{{ pointChangeListStr[0] }}</a>
                    </Transition>
                </div>
            </div>
            <div class="text"><strong>{{ gameStore.getSeat(0).name }}</strong></div>
        </div>

        <div class="child-place-center score-board top">
            <t-button class="riichi" :theme="gameStore.getSeat(2).riichi ? 'primary' : 'light'" 
                @click="onRiichi(2)">{{ $t('message.riichi')}}</t-button>
            <div class="title"><strong>{{ gameStore.getSeat(2).seat }}&nbsp;{{
                gameStore.getSeat(2).point }}</strong>
                <div class="text score-change">
                    <Transition name="slide-fade">
                        <a :style="[pointPositiveFlag[2] ? pointPositiveStyle : pointNegativeStyle]" v-if="pointChangeFlag[2]">{{ pointChangeListStr[2] }}</a>
                    </Transition>   
                </div> 
            </div>
            <div class="text"><strong>{{ gameStore.getSeat(2).name }}</strong></div>
        </div>


        <div class="child-place-center score-board right">
            <t-button class="riichi" :theme="gameStore.getSeat(1).riichi ? 'primary' : 'light'"
                @click="onRiichi(1)">{{ $t('message.riichi')}}</t-button>
            <div class="title"><strong>{{ gameStore.getSeat(1).seat }}&nbsp;{{
                gameStore.getSeat(1).point }}</strong>
                <div class="text score-change">
                    <Transition name="slide-fade">
                        <a :style="[pointPositiveFlag[1] ? pointPositiveStyle : pointNegativeStyle]" v-if="pointChangeFlag[1]">{{ pointChangeListStr[1] }}</a>
                    </Transition>    
                </div>
            </div>
            <div class="text"><strong>{{ gameStore.getSeat(1).name }}</strong></div>
        </div>


        <div class="child-place-center score-board left">
            <t-button class="riichi" :theme="gameStore.getSeat(3).riichi ? 'primary' : 'light'"
                @click="onRiichi(3)">{{ $t('message.riichi')}}</t-button>
            <div class="title"><strong>{{ gameStore.getSeat(3).seat }}&nbsp;{{
                gameStore.getSeat(3).point }}</strong>
                <div class="text score-change">
                    <Transition name="slide-fade">
                        <a :style="[pointPositiveFlag[3] ? pointPositiveStyle : pointNegativeStyle]" v-if="pointChangeFlag[3]">{{ pointChangeListStr[3] }}</a>
                    </Transition>    
                </div>
            </div>
            <div class="text"><strong>{{ gameStore.getSeat(3).name }}</strong></div>
        </div>

    </div>

    <div class = "button-board">
        <t-button class="actionButton" theme="light" @click="onTsumo">{{$t("message.tsumo")}}</t-button>
        <t-button class="actionButton" theme="light" @click="onRon">{{$t('message.ron')}}</t-button>
        <t-button class="actionButton" theme="light" @click="onRyuukyoku">{{$t('message.draw')}}</t-button>
        <t-button class="actionButton" theme="light" @click="onEdit">{{$t('message.edit')}}</t-button>
        <t-button class="actionButton" theme="light" @click="onRevoke">{{$t('message.revoke')}}</t-button>
    </div>

    <!-- <t-dialog v-model:visible="winState.tsumo">
        <t-picker v-model="winState.fanfu" :columns="fanfuList" @change="onTsumoConfirm" @cancel="onTsumoCancel" />
        <t-cell title="选择自摸玩家" borderless></t-cell>
        <t-radio-group v-model:value="winState.winner" @change="onTsumoRadioGroupChange">
            <t-radio v-for="playerName of gameStore.seatList" name="winner" :value="playerName" :label="playerName" />
        </t-radio-group>
    </t-dialog> -->

    <t-dialog style="--td-dialog-width: 90dvw; font-size: 14px;" v-model:visible="winState.tsumo" :confirm-btn="$t('message.confirm')" 
        :cancel-btn="$t('message.cancel')" @confirm="onTsumoConfirm">

        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            :content="$t('message.chooseHan')" :prefix-icon="false" />

        <div style="padding-top: 8px; padding-bottom: 8px;">
            <t-radio-group class="score" :value="winState.fanfutsumo.fan"
                @change="(value: string) => onFantsumoChange(value)">
                <view v-for="fan in fanfuList[0]"
                    :class="`card ${winState.fanfutsumo.fan == fan.value ? 'card--active' : ''}`">
                    <t-radio :value="fan.value" icon="none">
                        <div
                            style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                            {{ fan.label }}
                            <div style="width: 8px; height: 25px;">
                            </div>
                        </div>
                    </t-radio>
                </view>
            </t-radio-group>
        </div>

        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            :content="$t('message.chooseFu')" :prefix-icon="false" />

        <div style="padding-top: 8px; padding-bottom: 8px;">
            <t-radio-group class="score" :value="winState.fanfutsumo.fu"
                @change="(value: string) => onFutsumoChange(value)">
                <view v-for="fu in fanfuList[1]"
                    :class="`card ${winState.fanfutsumo.fu == fu.value ? 'card--active' : ''}`">
                    <t-radio :value="fu.value" icon="none">
                        <div
                            style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                            {{ fu.label }}
                            <div style="width: 8px; height: 25px;">
                            </div>
                        </div>
                    </t-radio>
                </view>
            </t-radio-group>
        </div>


        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            :content="$t('message.chooseSelfDrawPlayer')" :prefix-icon="false" />

        <div style="padding-top: 8px;">
            <t-radio-group class="player-selecter" v-model:value="winState.winner" @change="onTsumoRadioGroupChange">
                <view v-for="playerName of gameStore.seatList"
                    :class="`card ${winState.winner == playerName ? 'card--active' : ''}`">
                    <t-radio :value="playerName" icon="none">
                        <div
                            style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                            {{ playerName }}
                            <div style="width: 8px; height: 25px;">
                            </div>
                        </div>
                    </t-radio>
                </view>
            </t-radio-group>
        </div>
    </t-dialog>


    <t-dialog style="--td-dialog-width: 90dvw; font-size: 14px;" v-model:visible="winState.ron" :confirm-btn="$t('message.confirm')" 
        :cancel-btn="$t('message.cancel')" @confirm="onRonConfirm">
        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            :content="$t('message.chooseRonPlayer')" :prefix-icon="false" />
        <t-checkbox-group style="--td-checkbox-border-color:none" v-model:value="winState.winners"
            @change="onRonCheckboxGroupChange">
            <t-checkbox :value="gameStore.getSeat(0).name" :contentDisabled="true">
                <div style="display: flex;">
                    <div style="flex: 3; text-align: left;">
                        {{ gameStore.getSeat(0).name }}
                    </div>
                    <t-button style="flex: 1" block variant="outline" theme="primary" size="extra-small"
                        @click="seat0FanChick = true">
                        {{ winState.fanfuRon[0].fan }} </t-button>
                    <div style="flex: 0.2"></div>
                    <t-button style="flex:1" block variant="outline" theme="primary" size="extra-small"
                        @click="seat0FuChick = true">
                        {{ winState.fanfuRon[0].fu }} </t-button>
                </div>
            </t-checkbox>

            <t-checkbox :value="gameStore.getSeat(1).name" :contentDisabled="true">
                <div style="display: flex;">
                    <div style="flex: 3; text-align: left;">
                        {{ gameStore.getSeat(1).name }}
                    </div>
                    <t-button style="flex: 1" block variant="outline" theme="primary" size="extra-small"
                        @click="seat1FanChick = true">
                        {{ winState.fanfuRon[1].fan }} </t-button>
                    <div style="flex: 0.2"></div>
                    <t-button style="flex:1" block variant="outline" theme="primary" size="extra-small"
                        @click="seat1FuChick = true">
                        {{ winState.fanfuRon[1].fu }} </t-button>
                </div>
            </t-checkbox>

            <t-checkbox :value="gameStore.getSeat(2).name" :contentDisabled="true">
                <div style="display: flex;">
                    <div style="flex: 3; text-align: left;">
                        {{ gameStore.getSeat(2).name }}
                    </div>
                    <t-button style="flex: 1" block variant="outline" theme="primary" size="extra-small"
                        @click="seat2FanChick = true">
                        {{ winState.fanfuRon[2].fan }} </t-button>
                    <div style="flex: 0.2"></div>
                    <t-button style="flex:1" block variant="outline" theme="primary" size="extra-small"
                        @click="seat2FuChick = true">
                        {{ winState.fanfuRon[2].fu }} </t-button>
                </div>
            </t-checkbox>


            <t-checkbox :value="gameStore.getSeat(3).name" :contentDisabled="true">
                <div style="display: flex;">
                    <div style="flex: 3; text-align: left;">
                        {{ gameStore.getSeat(3).name }}
                    </div>
                    <t-button style="flex: 1" block variant="outline" theme="primary" size="extra-small"
                        @click="seat3FanChick = true">
                        {{ winState.fanfuRon[3].fan }} </t-button>
                    <div style="flex: 0.2"></div>

                    <t-button style="flex:1" block variant="outline" theme="primary" size="extra-small"
                        @click="seat3FuChick = true">
                        {{ winState.fanfuRon[3].fu }} </t-button>
                </div>
            </t-checkbox>
        </t-checkbox-group>

        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            :content="$t('message.chooseDealInPlayer')" :prefix-icon="false" />

        <div style="padding: 16px;">
            <t-radio-group class="player-selecter" v-model:value="winState.loser" @change="onRonRadioGroupChange">
                <view v-for="playerName of gameStore.seatList"
                    :class="`card ${winState.loser == playerName ? 'card--active' : ''}`">
                    <t-radio :value="playerName" icon="none">
                        <div
                            style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                            {{ playerName }}
                            <div style="width: 8px; height: 25px;">
                            </div>
                        </div>
                    </t-radio>
                </view>
            </t-radio-group>
        </div>
    </t-dialog>

    <t-overlay :visible="seat0FanChick" :zIndex="15000" />
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat0FanChick" :title="$t('message.chooseHan')" close-btn :zIndex="15001">
        <t-radio-group class="score" :value="winState.fanfuRon[0].fan"
            @change="(value: string) => onFanRonChange(value, 0)">
            <view v-for="fan in fanfuList[0]"
                :class="`card ${winState.fanfuRon[0].fan == fan.value ? 'card--active' : ''}`">
                <t-radio :value="fan.value" icon="none">
                    <div
                        style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                        {{ fan.label }}
                        <div style="width: 8px; height: 25px;">
                        </div>
                    </div>
                </t-radio>
            </view>
        </t-radio-group>
    </t-dialog>

    <t-overlay :visible="seat0FuChick" :zIndex="15000" />
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat0FuChick" :title="$t('message.chooseFu')" close-btn :zIndex="15001">
        <t-radio-group class="score" :value="winState.fanfuRon[0].fu"
            @change="(value: string) => onFuRonChange(value, 0)">
            <view v-for="fu in fanfuList[1]"
                :class="`card ${winState.fanfuRon[0].fu == fu.value ? 'card--active' : ''}`">
                <t-radio :value="fu.value" icon="none">
                    <div
                        style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                        {{ fu.label }}
                        <div style="width: 8px; height: 25px;">
                        </div>
                    </div>
                </t-radio>
            </view>
        </t-radio-group>
    </t-dialog>


    <t-overlay :visible="seat1FanChick" :zIndex="15000" />
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat1FanChick" :title="$t('message.chooseHan')" close-btn :zIndex="15001">
        <t-radio-group class="score" :value="winState.fanfuRon[1].fan"
            @change="(value: string) => onFanRonChange(value, 1)">
            <view v-for="fan in fanfuList[0]"
                :class="`card ${winState.fanfuRon[1].fan == fan.value ? 'card--active' : ''}`">
                <t-radio :value="fan.value" icon="none">
                    <div
                        style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                        {{ fan.label }}
                        <div style="width: 8px; height: 25px;">
                        </div>
                    </div>
                </t-radio>
            </view>
        </t-radio-group>
    </t-dialog>

    <t-overlay :visible="seat1FuChick" :zIndex="15000" />
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat1FuChick" :title="$t('message.chooseFu')" close-btn :zIndex="15001">
        <t-radio-group class="score" :value="winState.fanfuRon[1].fu"
            @change="(value: string) => onFuRonChange(value, 1)">
            <view v-for="fu in fanfuList[1]"
                :class="`card ${winState.fanfuRon[1].fu == fu.value ? 'card--active' : ''}`">
                <t-radio :value="fu.value" icon="none">
                    <div
                        style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                        {{ fu.label }}
                        <div style="width: 8px; height: 25px;">
                        </div>
                    </div>
                </t-radio>
            </view>
        </t-radio-group>
    </t-dialog>


    <t-overlay :visible="seat2FanChick" :zIndex="15000" />
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat2FanChick" :title="$t('message.chooseHan')" close-btn :zIndex="15001">
        <t-radio-group class="score" :value="winState.fanfuRon[2].fan"
            @change="(value: string) => onFanRonChange(value, 2)">
            <view v-for="fan in fanfuList[0]"
                :class="`card ${winState.fanfuRon[2].fan == fan.value ? 'card--active' : ''}`">
                <t-radio :value="fan.value" icon="none">
                    <div
                        style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                        {{ fan.label }}
                        <div style="width: 8px; height: 25px;">
                        </div>
                    </div>
                </t-radio>
            </view>
        </t-radio-group>
    </t-dialog>

    <t-overlay :visible="seat2FuChick" :zIndex="15000" />
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat2FuChick" :title="$t('message.chooseFu')" close-btn :zIndex="15001">
        <t-radio-group class="score" :value="winState.fanfuRon[2].fu"
            @change="(value: string) => onFuRonChange(value, 2)">
            <view v-for="fu in fanfuList[1]"
                :class="`card ${winState.fanfuRon[2].fu == fu.value ? 'card--active' : ''}`">
                <t-radio :value="fu.value" icon="none">
                    <div
                        style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                        {{ fu.label }}
                        <div style="width: 8px; height: 25px;">
                        </div>
                    </div>
                </t-radio>
            </view>
        </t-radio-group>
    </t-dialog>


    <t-overlay :visible="seat3FanChick" :zIndex="15000" />
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat3FanChick" :title="$t('message.chooseHan')" close-btn :zIndex="15001">
        <t-radio-group class="score" :value="winState.fanfuRon[3].fan"
            @change="(value: string) => onFanRonChange(value, 3)">
            <view v-for="fan in fanfuList[0]"
                :class="`card ${winState.fanfuRon[3].fan == fan.value ? 'card--active' : ''}`">
                <t-radio :value="fan.value" icon="none">
                    <div
                        style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                        {{ fan.label }}
                        <div style="width: 8px; height: 25px;">
                        </div>
                    </div>
                </t-radio>
            </view>
        </t-radio-group>
    </t-dialog>

    <t-overlay :visible="seat3FuChick" :zIndex="15000" />
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat3FuChick" :title="$t('message.chooseFu')" close-btn :zIndex="15001">
        <t-radio-group class="score" :value="winState.fanfuRon[3].fu"
            @change="(value: string) => onFuRonChange(value, 3)">
            <view v-for="fu in fanfuList[1]"
                :class="`card ${winState.fanfuRon[3].fu == fu.value ? 'card--active' : ''}`">
                <t-radio :value="fu.value" icon="none">
                    <div
                        style="display: flex;align-content: space-around;justify-content: center;flex-direction: row; align-items: flex-end;">
                        {{ fu.label }}
                        <div style="width: 8px; height: 25px;">
                        </div>
                    </div>
                </t-radio>
            </view>
        </t-radio-group>
    </t-dialog>


    <t-dialog v-model:visible="winState.ryuukyoku" :confirm-btn="$t('message.confirm')" :cancel-btn="$t('message.cancel')" @confirm="onRyuukyokuConfirm"
        @cancel="onRyuukyokuCancel">
        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            :content="$t('message.chooseTenpaiPlayer')" :prefix-icon="false" />
        <t-checkbox-group style="--td-checkbox-border-color:none" v-model:value="winState.winners" :options="options"
            @change="onRyuukyokuCheckboxGroupChange" />
    </t-dialog>

    <t-dialog v-model:visible="editState.on">
        <t-picker v-model="editState.currentKyoku" :columns="kyokuListOptions" @change="onEditChange"
            @cancel="onEditCancel" />
        <t-row>
            <t-col span="12">
                <div style="margin: auto; text-align: right">
                    <p><b>{{$t('message.honba', 0)}}: </b></p>
                </div>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.honba" type="number" class="dialog-input" clearable slot="content"
                    :placeholder="$t('message.enterHonba')" placeholder-class="placeholder" borderless />
            </t-col>
        </t-row>
        <t-row>
            <t-col span="12">
                <div style="margin: auto; text-align: right;">
                <p><b>{{$t('message.deposits')}}(x1000): </b></p>
                </div>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.kyoutaku" type="number" class="dialog-input" clearable slot="content"
                    :placeholder="$t('message.enterDeposits')" placeholder-class="placeholder" borderless />
            </t-col>
        </t-row>
        <t-row v-for="(playerName, index) of gameStore.seatList" :key="index">
            <t-col span="12">
                <div style="margin: auto; text-align: right;">
                <p><b>{{ playerName }}: </b></p>
                </div>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.pointList[index]" type="number" class="dialog-input" clearable
                    slot="content" :placeholder="$t('message.enterPoint')" placeholder-class="placeholder" borderless />
            </t-col>
        </t-row>
    </t-dialog>

    <t-dialog v-model:visible="revokeState.on" close-on-overlay-click :content="$t('message.revokeAlert')" :cancel-btn="$t('message.cancel')"
        :confirm-btn="{ content: $t('message.confirm'), theme: 'danger' }" @confirm="onRevokeConfirm" @cancel="onRevokeCancel"
        @close="onRevokeClose">
    </t-dialog>

    <t-dialog v-model:visible="finalState.on" :title="$t('message.matchResult')" :confirm-btn="$t('message.confirm')" @confirm="onFinalConfirm">
        <p v-for="(playerName, index) of finalState.result" :key="index" class="text" style="margin-bottom: 2dvmin">
            <strong>{{ playerName }} : {{ gameStore.getPlayer(playerName).point }}</strong>
        </p>
    </t-dialog>

    <t-dialog v-model:visible="leave.showAlert" close-on-overlay-click :content="$t('message.leaveAlert')" :cancel-btn="$t('message.cancel')"
        :confirm-btn="{ content: $t('message.confirm'), theme: 'danger' }" @confirm="onConfirm" @cancel="onCancel" @close="onClose">
    </t-dialog>

</template>

<script lang="ts" setup>

import router from '@/router';
import type { HistoryData } from '@/stores/storage';
import { saveHistory, useGameStore } from '@/stores/storage';
import type { Player } from '@/ts/common';
import { GameLength, toDigitString} from '@/ts/common';
import { Toast } from 'tdesign-mobile-vue';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { onBeforeRouteLeave, type RouteLocationNormalized } from 'vue-router';
import { useI18n } from 'vue-i18n';

const {t} = useI18n();

let wakeLock: WakeLockSentinel | null = null;

const setWakeLock = async () => {
    if (document.visibilityState != 'visible' || wakeLock) {
        return;
    }
    await navigator.wakeLock.request().then(result => {
        wakeLock = result;
        wakeLock.addEventListener('release', () => {
            wakeLock = null;
        });
    }).catch(err => {
        console.log(`${err.name}, ${err.message}`);
    });
};

onMounted(() => {
    setWakeLock()
    document.addEventListener('visibilitychange', setWakeLock);
})

onUnmounted(() => {
    document.removeEventListener('visibilitychange', setWakeLock);
})

const gameStore = useGameStore()

// 局内逻辑
const kyokuList = [] as string[];
const kazeList = [t('position.east'), t('position.south'), t('position.west'), t('position.north')]
for(let i in kazeList)
{
    for(let j = 1; j <= 4; j++)
    {
        kyokuList.push(t('message.kyoku', {wind: kazeList[i],gameNum: toDigitString(j, gameStore.language)}))
    }
}
const fanList = [
    toDigitString( 1, gameStore.language) + t('message.fan'),
    toDigitString( 2, gameStore.language) + t('message.fan'),
    toDigitString( 3, gameStore.language) + t('message.fan'),
    toDigitString( 4, gameStore.language) + t('message.fan'),
    t('fan.mangan'), t('fan.haneman'), t('fan.baiman'), t('fan.sanbaiman'), t('fan.yakuman'), 
    t('fan.multiYakuman', {num: toDigitString( 2, gameStore.language)}),
    t('fan.multiYakuman', {num: toDigitString( 3, gameStore.language)}), 
    t('fan.multiYakuman', {num: toDigitString( 4, gameStore.language)}), 
    t('fan.multiYakuman', {num: toDigitString( 5, gameStore.language)}), 
    t('fan.multiYakuman', {num: toDigitString( 6, gameStore.language)}), 
]
const fuList = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]
const fuListStr = fuList.map((fu:number)=> fu.toString() + " " + t('message.fu'));
const kyokuListOptions = ref<{ label: string, value: string }[][]>([]);
const fanfuList = ref<{ label: string, value: string }[][]>([]);
const currentKyoku = ref<number>(0)
const honba = ref<number>(0)
const kyoutaku = ref<number>(0)
let endingFlag = false
const ronWinnerFlag = reactive([false, false, false, false])
const pointChangeFlag = reactive([false, false, false, false])
const pointPositiveFlag = reactive([false, false, false, false])
const pointChangeList = reactive([0, 0, 0, 0])
const pointChangeListStr = reactive(['0', '0', '0', '0'])

const pointPositiveStyle = reactive({
  color: 'green',
  fontSize: '4dvmin'
})

const pointNegativeStyle = reactive({
  color: 'red',
  fontSize: '4dvmin'
})

// 和了，流局
interface WinState {
    fanfutsumo: { fan: string, fu: string },
    fanfuRon: { fan: string, fu: string }[],
    winners: string[],
    winner: string,
    loser: string,
    ron: boolean,
    ronCheck: boolean,
    tsumo: boolean,
    tsumoCheck: boolean,
    ryuukyoku: boolean,
    ryuukyokuCheck: boolean,
    oyaWinFlag: boolean
}

const winState: WinState = reactive({
    fanfutsumo: { fan: fanList[0], fu: fuListStr[2] },
    fanfuRon: [],
    winners: [],
    winner: '',
    loser: '',
    ron: false,
    ronCheck: false,
    tsumo: false,
    tsumoCheck: false,
    ryuukyoku: false,
    ryuukyokuCheck: false,
    oyaWinFlag: false
})

resetwinState()

// 编辑
interface EditState {
    on: boolean,
    currentKyoku: Array<string>,
    honba: String,
    kyoutaku: String,
    pointList: Array<String>
}

const editState: EditState = reactive({
    on: false,
    currentKyoku: [],
    honba: '0',
    kyoutaku: '0',
    pointList: Array(4).fill((String)(gameStore.startPoint))
})

// 撤销
interface RevokeState {
    on: boolean,
    currentKyoku: number,
    honba: string,
    kyoutaku: string,
    pointList: Array<string>
}

const revokeState: RevokeState = reactive({
    on: false,
    currentKyoku: 0,
    honba: '0',
    kyoutaku: '0',
    pointList: Array(4).fill((String)(gameStore.startPoint))
})

// 终局结果
interface FinalState {
    on: boolean,
    result: Array<string>
}

const finalState: FinalState = reactive({
    on: false,
    result: []
})

// 和了放铳对象选项框
const options = ref<{ label: string, value: string }[]>([])

onMounted(() => {
    // 番符选择器初始化
    var result: { label: string, value: string }[][] = [[], []]
    for (const fan of fanList as string[]) {
        result[0].push({
            label: fan,
            value: fan
        });
    }

    for (const fu of fuListStr as string[]) {
        result[1].push({
            label: fu,
            value: fu
        });
    }

    fanfuList.value = result

    // 选局列表初始化
    var resultKyoku: { label: string, value: string }[][] = [[]]
    for (const kyoku of kyokuList as string[]) {
        resultKyoku[0].push({
            label: kyoku,
            value: kyoku
        });
    }

    kyokuListOptions.value = resultKyoku

    // 和了放铳对象选项框初始化
    // 风向初始化
    var resultPlayer: { label: string, value: string }[] = []
    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.seat = kazeList[(i + 4 - gameStore.startSeat) % 4]
        gameStore.setPlayer(player.name, player)

        resultPlayer.push({
            label: player.name,
            value: player.name
        })
    }
    options.value = resultPlayer

    setEditState()
    setRevokeState()
    resetwinState()
})

function resetwinState() {
    winState.fanfutsumo = { fan: fanList[0], fu: fuListStr[2] }
    winState.fanfuRon = []
    for (let i = 0; i < 4; i++) {
        winState.fanfuRon.push({ fan: fanList[0], fu: fuListStr[2] })
    }
    winState.winners = []
    winState.winner = ''
    winState.loser = ''
    winState.ron = false
    winState.ronCheck = false
    winState.tsumo = false
    winState.tsumoCheck = false
    winState.ryuukyoku = false
    winState.ryuukyokuCheck = false
    winState.oyaWinFlag = false

}

function setEditState() {
    editState.currentKyoku = [kyokuList[currentKyoku.value]]
    editState.honba = (String)(honba.value)
    editState.kyoutaku = (String)(kyoutaku.value)
    editState.pointList = []
    for (var i = 0; i < 4; i++) {
        editState.pointList.push((String)(gameStore.getSeat(i).point))
    }
}

function setRevokeState() {
    revokeState.currentKyoku = currentKyoku.value
    revokeState.honba = (String)(honba.value)
    revokeState.kyoutaku = (String)(kyoutaku.value)
    revokeState.pointList = []
    for (var i = 0; i < 4; i++) {
        revokeState.pointList.push((String)(gameStore.getSeat(i).point))
    }
}

function goNextKyoku() {
    var riichibous = 0
    for (var i = 0; i < 4; i++) {
        let player = gameStore.getSeat(i)
        if (player.riichi) {
            riichibous++
            player.riichi = false
            gameStore.setPlayer(player.name, player)
        }
    }
    if (winState.oyaWinFlag) {
        honba.value++
        if (winState.ryuukyokuCheck) {
            kyoutaku.value += riichibous
        }
        else {
            kyoutaku.value = 0
        }
    }
    else {
        if (winState.ryuukyokuCheck) {
            honba.value++
            kyoutaku.value += riichibous
        }
        else {
            honba.value = 0
            kyoutaku.value = 0
        }

        currentKyoku.value++
        for (var i = 0; i < 4; i++) {
            var player = gameStore.getSeat(i)
            player.seat = kazeList[(i + 4 - gameStore.startSeat + 16 - currentKyoku.value) % 4]
            gameStore.setPlayer(player.name, player)
        }
    }

    resetwinState()
    return
}

function checkGameOver(): boolean {
    // 击飞，结束游戏
    if (gameStore.bankruptcy) {
        for (let i = 0; i < 4; i++) {
            let player = gameStore.getSeat(i)
            if (player.point < 0) {
                return true
            }
        }
    }

    var allLast = 7;
    // 对局长度
    switch(gameStore.gameType)
    {
        case GameLength.quarterGame:
            allLast = 3;
            break;
        case GameLength.halfGame:
            allLast = 7;
            break;
        case GameLength.fullGame:
            allLast = 15;
            break;
    }

    // all last
    if (currentKyoku.value >= allLast) {
        // 检查亲家和了和流局听牌状态
        var oyaPlayer: Player = {
            name: '',
            seat: '',
            point: 0,
            riichi: false
        }
        for (var winPlayer of winState.winners as string[]) {
            if (gameStore.getPlayer(winPlayer).seat === kazeList[0]) {
                oyaPlayer = gameStore.getPlayer(winPlayer)
                break
            }
        }

        if (gameStore.getPlayer(winState.winner).seat === kazeList[0]) {
            oyaPlayer = gameStore.getPlayer(winState.winner)
        }

        // 寻找当前top
        var result: Map<string, number> = gameStore.getResultMap()
        var topPlayerNames = []
        var topPoint = 0
        for (const [name, point] of result) {
            if (point > topPoint) {
                topPlayerNames = []
                topPlayerNames.push(name)
                topPoint = point
                continue
            }
            if (point == topPoint) {
                topPlayerNames.push(name)
            }
        }

        var topPlayerSeat = gameStore.startSeat - 1
        for (const playerName of topPlayerNames as string[]) {
            var playerSeat = gameStore.seatList.indexOf(playerName)
            if ((playerSeat + 4 - gameStore.startSeat) % 4 < (topPlayerSeat + 4 - gameStore.startSeat) % 4) {
                topPlayerSeat = playerSeat
            }
        }
        var topPlayer = gameStore.getSeat(topPlayerSeat)
        if (winState.oyaWinFlag) {
            // 亲家和了或流局听牌
            // 亲家是top，结束游戏
            if (topPlayer.name === oyaPlayer.name) {
                if (topPoint >= gameStore.returnPoint) {
                    return true
                }
            }
        }
        else {
            //亲家未和了且流局未听牌
            // top低于返点，继续游戏（在强制终局前）
            if (topPoint < gameStore.returnPoint) {
                //全庄结束
                if (currentKyoku.value >= 15) {
                        return true;
                }
                if (gameStore.continuingIntoWest) {
                    // 西四局，强制终局
                    if (currentKyoku.value >= allLast + 4) {
                        return true
                    }
                }
                else {
                    // 南四局，强制终局
                    if (currentKyoku.value >= allLast) {
                        return true
                    }
                }
            }
            else {
                return true
            }
        }
    }


    return false
}

function goGameOver() {
    var resultPoint: number[] = []
    for (var i = 0; i < 4; i++) {
        resultPoint.push(gameStore.getSeat(i).point)
    }

    var result: string[] = gameStore.seatList.slice(0)
    var resultSeat: number[] = [0, 1, 2, 3]
    resultSeat = resultSeat.map(seat => (seat + 4 - gameStore.startSeat) % 4)
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4 - 1 - i; j++) {
            if (resultPoint[j] < resultPoint[j + 1]) {
                var temp = result[j]
                result[j] = result[j + 1]
                result[j + 1] = temp
                let temp2 = resultPoint[j]
                resultPoint[j] = resultPoint[j + 1]
                resultPoint[j + 1] = temp2
                let temp3 = resultSeat[j]
                resultSeat[j] = resultSeat[j + 1]
                resultSeat[j + 1] = temp3
            }
            if (resultPoint[j] == resultPoint[j + 1]) {
                if (resultSeat[j] > resultSeat[j + 1]) {
                    var temp = result[j]
                    result[j] = result[j + 1]
                    result[j + 1] = temp
                    let temp2 = resultPoint[j]
                    resultPoint[j] = resultPoint[j + 1]
                    resultPoint[j + 1] = temp2
                    let temp3 = resultSeat[j]
                    resultSeat[j] = resultSeat[j + 1]
                    resultSeat[j + 1] = temp3
                }
            }
        }
    }

    finalState.result = result

    let riichibous = 0

    for (const playerName of finalState.result) {
        let player = gameStore.getPlayer(playerName)
        if (player.riichi) {
            player.riichi = false
            riichibous++
        }
        gameStore.setPlayer(player.name, player)
    }

    let finaleWinner = gameStore.getPlayer(finalState.result[0])
    finaleWinner.point += riichibous * 1000 + kyoutaku.value * 1000
    gameStore.setPlayer(finaleWinner.name, finaleWinner)

    honba.value = 0
    kyoutaku.value = 0

    finalState.on = true
}

function calculateA(fan: number, fu: number): number {
    var a = fu * (2 ** (fan + 2))
    if (a > 2000) {
        a = 2000
    }
    if (fan == 6) {
        a = 3000
    }
    if (fan == 7) {
        a = 4000
    }
    if (fan == 8) {
        a = 6000
    }
    if (fan > 8) {
        a = 8000 * (fan - 8)
    }

    return a
}

function pointChange() {
    for (let i = 0; i < 4; i++) {
        if (pointChangeList[i] != 0) {
            pointChangeFlag[i] = true
            if (pointChangeList[i] > 0) {
                pointChangeListStr[i] = '+' + (String)(pointChangeList[i])
                pointPositiveFlag[i] = true
            }
            else {
                pointChangeListStr[i] = (String)(pointChangeList[i])
            }
        }
    }

    setTimeout(() => {
        for (let i = 0; i < 4; i++) {
            pointChangeFlag[i] = false
        }
    }, 3000);
}

function resetPointChange() {
    for (let i = 0; i < 4; i++) {
        pointChangeList[i] = 0
        pointChangeListStr[i] = '0'
        pointPositiveFlag[i] = false
    }
}

// 保存终局结果，返回setup页面
const onFinalConfirm = () => {
    let result: HistoryData = {
        timeStamp: Date.now(),
        record: new Array<string[]>()
    }
    for (let i = 0; i < 4; i++) {
        result.record.push([finalState.result[i], (String)(gameStore.getPlayer(finalState.result[i]).point)])
    }
    saveHistory(result)
    gameStore.resetPlayer()
    finalState.on = false
    endingFlag = true
    router.push('/setup');
}

const onRiichi = (seat: number) => {
    let player = gameStore.getSeat(seat)
    if (!gameStore.negativeRiichi && player.point < 1000) {
        return
    }
    player.riichi = !player.riichi
    gameStore.setPlayer(player.name, player)
}

// 自摸
const onTsumo = () => {
    winState.tsumo = true
}

const onTsumoRadioGroupChange = () => {

}

const onTsumoConfirm = () => {
    resetPointChange()
    if (winState.winner === '') {
        Toast.error(t('message.tsumoPlayerNotChosen'))
        return
    }

    setRevokeState()

    var winPlayer = gameStore.getPlayer(winState.winner)
    var winFan = fanList.indexOf(winState.fanfutsumo.fan) + 1
    var winFu = fuList[fuListStr.indexOf(winState.fanfutsumo.fu)]
    var a = calculateA(winFan, winFu)

    var riichibous = 0
    if (winPlayer.seat === kazeList[0]) {
        winState.oyaWinFlag = true
        var payPoint: number[] = [Math.ceil(2 * a / 100) * 100 + honba.value * 100]
        for (var i = 0; i < 4; i++) {
            let player = gameStore.getSeat(i)
            if (player.name === winPlayer.name) {
                continue
            }
            player.point -= payPoint[0]
            pointChangeList[i] -= payPoint[0]
            if (player.riichi) {
                riichibous++
                player.point -= 1000
                pointChangeList[i] -= 1000
            }
            gameStore.setPlayer(player.name, player)
        }
        winPlayer.point += 3 * payPoint[0] + kyoutaku.value * 1000 + riichibous * 1000
        pointChangeList[gameStore.seatList.indexOf(winPlayer.name)] += 3 * payPoint[0] + kyoutaku.value * 1000 + riichibous * 1000
        winPlayer.riichi = false
        gameStore.setPlayer(winPlayer.name, winPlayer)
    }
    else {
        var payPoint: number[] = [Math.ceil(a / 100) * 100 + honba.value * 100, Math.ceil(2 * a / 100) * 100 + honba.value * 100]
        for (var i = 0; i < 4; i++) {
            let player = gameStore.getSeat(i)
            if (player.name === winPlayer.name) {
                continue
            }
            if (player.seat === kazeList[0]) {
                player.point -= payPoint[1]
                pointChangeList[i] -= payPoint[1]
            }
            else {
                player.point -= payPoint[0]
                pointChangeList[i] -= payPoint[0]
            }
            if (player.riichi) {
                riichibous++
                player.point -= 1000
                pointChangeList[i] -= 1000
            }
            gameStore.setPlayer(player.name, player)
        }

        winPlayer.point += 2 * payPoint[0] + payPoint[1] + kyoutaku.value * 1000 + riichibous * 1000
        pointChangeList[gameStore.seatList.indexOf(winPlayer.name)] += 2 * payPoint[0] + payPoint[1] + kyoutaku.value * 1000 + riichibous * 1000
        gameStore.setPlayer(winPlayer.name, winPlayer)
    }

    winState.tsumoCheck = true
    if (checkGameOver()) {
        goGameOver()
    }

    goNextKyoku()
    setEditState()
    winState.tsumo = false
    pointChange()
}

const onTsumoCancel = () => {
    winState.tsumo = false
}

// 荣和
const onRon = () => {
    winState.ron = true
}

const onRonCheckboxGroupChange = (value: any, context: { e: Event, current: string, type: string }) => {
    let seat = gameStore.seatList.indexOf(context.current)
    if (context.type === 'check') {
        ronWinnerFlag[seat] = true
    }
    else {
        ronWinnerFlag[seat] = false
    }
}

const onRonRadioGroupChange = () => {

}

const seat0FanChick = ref(false)
const seat0FuChick = ref(false)
const seat1FanChick = ref(false)
const seat1FuChick = ref(false)
const seat2FanChick = ref(false)
const seat2FuChick = ref(false)
const seat3FanChick = ref(false)
const seat3FuChick = ref(false)

const onFanRonChange = (value: string, index: number) => {
    winState.fanfuRon[index].fan = value
}

const onFuRonChange = (value: string, index: number) => {
    winState.fanfuRon[index].fu = value
}


const onFantsumoChange = (value: string) => {
    winState.fanfutsumo.fan = value
}

const onFutsumoChange = (value: string) => {
    winState.fanfutsumo.fu = value
}

const onRonConfirm = () => {
    resetPointChange()
    if (winState.winners.length < 1) {
        Toast.error(t('message.winningPlayerNotChosen'))
        return
    }
    if (winState.loser === '') {
        Toast.error(t('message.dealinPlayerNotChosen'))
        return
    }

    setRevokeState()

    var winPlayers: Array<Player> = []
    var winSeats: number[] = []
    for (const winPlayerName of winState.winners as string[]) {
        winSeats.push(gameStore.seatList.indexOf(winPlayerName))
    }

    var losePlayer: Player = gameStore.getPlayer(winState.loser)
    var loseSeat = gameStore.seatList.indexOf(winState.loser)
    winSeats = winSeats.sort((a, b) => ((a - loseSeat + 4) % 4) - ((b - loseSeat + 4) % 4))

    for (const winSeat of winSeats as number[]) {
        winPlayers.push(gameStore.getSeat(winSeat))
    }


    for (let i = 0; i < winPlayers.length; i++) {
        var seat = winSeats[i]
        var winFan = fanList.indexOf(winState.fanfuRon[seat].fan) + 1
        var winFu = fuList[fuListStr.indexOf(winState.fanfuRon[seat].fu)]
        var a = calculateA(winFan, winFu)
        if (winPlayers[i].seat === kazeList[0]) {
            winState.oyaWinFlag = true
            var payPoint: number = Math.ceil(6 * a / 100) * 100
            winPlayers[i].point += payPoint
            pointChangeList[gameStore.seatList.indexOf(winPlayers[i].name)] += payPoint
            winPlayers[i].riichi = false
            losePlayer.point -= payPoint
            pointChangeList[gameStore.seatList.indexOf(losePlayer.name)] -= payPoint
        }
        else {
            var payPoint: number = Math.ceil(4 * a / 100) * 100
            winPlayers[i].point += payPoint
            pointChangeList[gameStore.seatList.indexOf(winPlayers[i].name)] += payPoint
            winPlayers[i].riichi = false
            losePlayer.point -= payPoint
            pointChangeList[gameStore.seatList.indexOf(losePlayer.name)] -= payPoint
        }
        if (i == 0) {
            for (var j = 0; j < 4; j++) {
                let player = gameStore.getSeat(j)
                if (player.name === winPlayers[i].name) {
                    continue
                }
                if (player.riichi) {
                    player.riichi = false
                    player.point -= 1000
                    pointChangeList[i] -= 1000
                    winPlayers[i].point += 1000
                    pointChangeList[gameStore.seatList.indexOf(winPlayers[i].name)] += 1000
                }
                gameStore.setPlayer(player.name, player)
            }

            winPlayers[i].point += honba.value * 300 + kyoutaku.value * 1000
            pointChangeList[gameStore.seatList.indexOf(winPlayers[i].name)] += honba.value * 300 + kyoutaku.value * 1000
            losePlayer.point -= honba.value * 300
            pointChangeList[gameStore.seatList.indexOf(losePlayer.name)] -= honba.value * 300
        }

        gameStore.setPlayer(winPlayers[i].name, winPlayers[i])
    }
    gameStore.setPlayer(losePlayer.name, losePlayer)

    winState.ronCheck = true
    if (checkGameOver()) {
        goGameOver()
    }

    goNextKyoku()
    setEditState()
    resetwinState()
    winState.ron = false
    pointChange()
}

const onRonCancel = () => {
    winState.ron = false
}

// 流局
const onRyuukyoku = () => {
    for (let i = 0; i < 4; i++) {
        let player = gameStore.getSeat(i)
        if (player.riichi) {
            winState.winners.push(player.name)
        }
    }
    winState.ryuukyoku = true
}

const onRyuukyokuCancel = () => {
    resetwinState()
}

const onRyuukyokuCheckboxGroupChange = () => {

}

const onRyuukyokuConfirm = () => {
    resetPointChange()
    setRevokeState()

    var winPlayers: Array<object> = []
    for (const winPlayerName of winState.winners as string[]) {
        var winPlayer = gameStore.getPlayer(winPlayerName)
        winPlayers.push(winPlayer)
        if (winPlayer.riichi) {
            winPlayer.point -= 1000
            pointChangeList[gameStore.seatList.indexOf(winPlayerName)] -= 1000
            gameStore.setPlayer(winPlayer.name, winPlayer)
        }
        if (winPlayer.seat === kazeList[0]) {
            winState.oyaWinFlag = true
        }
    }

    if (winState.winners.length == 3) {
        for (var i = 0; i < 4; i++) {
            let player = gameStore.getSeat(i)
            if (winState.winners.indexOf(player.name) < 0) {
                player.point -= 3000
                pointChangeList[i] -= 3000
            }
            else {
                player.point += 1000
                pointChangeList[i] += 1000
            }
            gameStore.setPlayer(player.name, player)
        }
    }
    if (winState.winners.length == 2) {
        for (var i = 0; i < 4; i++) {
            let player = gameStore.getSeat(i)
            if (winState.winners.indexOf(player.name) < 0) {
                player.point -= 1500
                pointChangeList[i] -= 1500
            }
            else {
                player.point += 1500
                pointChangeList[i] += 1500
            }
            gameStore.setPlayer(player.name, player)
        }
    }
    if (winState.winners.length == 1) {
        for (var i = 0; i < 4; i++) {
            let player = gameStore.getSeat(i)
            if (winState.winners.indexOf(player.name) < 0) {
                player.point -= 1000
                pointChangeList[i] -= 1000
            }
            else {
                player.point += 3000
                pointChangeList[i] += 3000
            }
            gameStore.setPlayer(player.name, player)
        }
    }

    winState.ryuukyokuCheck = true
    if (checkGameOver()) {
        goGameOver()
    }

    goNextKyoku()
    setEditState()
    winState.ryuukyoku = false
    pointChange()
}

// 编辑
const onEdit = () => {
    editState.on = true
}

const onEditChange = () => {
    if (!Number.isInteger(Number(editState.honba)) || Number(editState.honba) < 0 || editState.honba === '') {
        Toast.error(t('message.honbaError'))
        return
    }
    if (!Number.isInteger(Number(editState.kyoutaku)) || Number(editState.kyoutaku) < 0 || editState.kyoutaku === '') {
        Toast.error(t('message.depositsError'))
        return
    }

    for (const point of editState.pointList as string[]) {
        if (!Number.isInteger(Number(point)) || Number(point) % 100 != 0 || point === '') {
            Toast.error(t('message.pointMutiple100'))
            return
        }
    }

    setRevokeState()

    let checkSum = 0
    for (const point of editState.pointList as string[]) {
        checkSum += Number(point)
    }
    checkSum += Number(editState.kyoutaku) * 1000
    if (checkSum != gameStore.startPoint * 4) {
        Toast.error(t('message.totalPointError'))
        return
    }

    currentKyoku.value = kyokuList.indexOf(editState.currentKyoku.join(''))
    honba.value = Number(editState.honba)
    kyoutaku.value = Number(editState.kyoutaku)
    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.point = Number(editState.pointList[i])
        player.riichi = false
        gameStore.setPlayer(player.name, player)
    }

    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.seat = kazeList[(i + 4 - gameStore.startSeat + 16 - currentKyoku.value) % 4]
        gameStore.setPlayer(player.name, player)
    }

    resetwinState()

    editState.on = false
}

const onEditCancel = () => {
    setEditState()
    editState.on = false
}

// 撤销
const onRevoke = () => {
    revokeState.on = true
}

const onRevokeConfirm = () => {
    currentKyoku.value = revokeState.currentKyoku
    honba.value = Number(revokeState.honba)
    kyoutaku.value = Number(revokeState.kyoutaku)
    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.point = Number(revokeState.pointList[i])
        player.riichi = false
        gameStore.setPlayer(player.name, player)
    }

    for (var i = 0; i < 4; i++) {
        var player = gameStore.getSeat(i)
        player.seat = kazeList[(i + 4 - gameStore.startSeat + 16 - currentKyoku.value) % 4]
        gameStore.setPlayer(player.name, player)
    }

    resetwinState()

    revokeState.on = false
}

const onRevokeCancel = () => {
    revokeState.on = false
}

const onRevokeClose = () => {
    revokeState.on = false
}

// 界面逻辑
const leave = ref({
    showAlert: false,
    to: {} as RouteLocationNormalized,
    next: {} as Function
})

onBeforeRouteLeave((to, from, next) => {
    leave.value.to = to
    leave.value.next = next
    if (!endingFlag) {
        leave.value.showAlert = true
        return
    }
    leave.value.next()
});


const onConfirm = () => {
    leave.value.next()
};

const onCancel = () => {
    leave.value.next(false)
};

const onClose = () => {
};

const eventHandler = (event: Event) => {
    event.preventDefault();
};

onMounted(() => {
    window.addEventListener('beforeunload', eventHandler);
    window.addEventListener('popstate', eventHandler);
});

onUnmounted(() => {
    window.removeEventListener('beforeunload', eventHandler);
    window.removeEventListener('popstate', eventHandler);
});

</script>

<style scoped lang="less">

.main-board {
    height: 90dvh;
    width: 100dvw;
    position: absolute;
    margin: auto; 
    top: 0;
    left: 0;
    right: 0;
    background-color: #fcbad3;
}

.round-board {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: blanchedalmond;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    width: 35dvmin;
    height: 35dvmin;
}

.child-place-center {
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
}

.button-board {
    height: 10dvh;
    width: 100dvw;
    position: absolute;
    margin: auto; 
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #aa96da;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.score-board 
{
    width: 40dvmin;
    height: 25dvmin;
    position: absolute;
    &.bottom
    {
        left: 50%;
        transform: translateX(-50%);
        bottom: 2dvmin;
    }
    &.top
    {
        left: 50%;
        transform: translateX(-50%) rotate(180deg);
        top: 2dvmin;
    }
    &.left
    {
        top: 50%;
        transform: translateY(-50%) rotate(90deg) ;
        left: -5dvmin;
    }
    &.right
    {
        top: 50%;
        transform: translateY(-50%) rotate(270deg);
        right: -5dvmin;
    }
}

.score-change
{
    display: inline-block;
    position: absolute;
    right: -20dvmin;
    background-color: transparent; 
}

.actionButton {
    width: 14dvmin;
    height: 7dvmin;
    margin-left: 2dvmin;
    margin-right: 2dvmin;
}


.riichi {
    width: 20dvmin;
    height: 10dvmin;
    margin: auto;
    right: 0;
    left: 0;
}

.title {
    font-size: 8dvmin;
    line-height: 7dvmin;
    text-align: center;
}

.text {
    font-size: 4dvmin;
    text-align: center;
}

.score {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
    gap: 2px;
    --td-radio-vertical-padding: 0px;

    >*{
        padding: 0px;
    }

    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 30px;
        font-size: 2dvmin;
        position: relative;
        border-radius: 6px;
        overflow: hidden;
        box-sizing: border-box;
        border: 1.5px solid #777;
        --td-radio-font-size: 14px;
    }

    .card--active {
        border-color: #0052d9;
        &::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            border: 8px solid #0052d9;
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
    }
}


.player-selecter {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
    gap: 5px;
    --td-radio-vertical-padding: 0px;

    >*{
        padding: 0px;
    }

    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 30px;
        position: relative;
        border-radius: 6px;
        overflow: hidden;
        box-sizing: border-box;
        border: 1.5px solid #777;
    }

    .card--active {
        border-color: #0052d9;

        &::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            border: 8px solid #0052d9;
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
    }
}

.slide-fade-enter-active {
  transition: all 0s ease-out;
}

.slide-fade-leave-active {
  transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>

