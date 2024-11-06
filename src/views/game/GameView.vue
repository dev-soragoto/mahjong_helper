<template>
    <div style="height: 90dvh; width: 100dvw; position: absolute; margin: auto; 
        top: 0; left: 0; right: 0; background-color: #fcbad3;">

        <div style="position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;
              background-color: blanchedalmond; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 35dvmin; height: 35dvmin;">
            <p class="title"><strong>{{ kyokuList[currentKyoku] }}</strong></p>
            <p class="text"><strong>{{ honba }}本场</strong></p>
            <p class="text"><strong>{{ kyoutaku * 1000 }}供托</strong></p>
        </div>

        <div style="position: absolute; margin: auto; left: 0; right: 0; bottom: 2dvmin;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 80dvmin; height: 25dvmin;">
            <t-button class="riichi" style="margin-bottom: -2dvmin"
                :theme="gameStore.getSeat(0).riichi ? 'primary' : 'light'" @click="onRiichi(0)">立直</t-button>
            <p class="title" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(0).seat }} {{
                gameStore.getSeat(0).point }}</strong>
                <div class="text" style="position: absolute; margin: auto; left: 63dvmin; right: 0; background-color: transparent; 
                display: flex; flex-direction: row; flex: 0 1 auto;">
                    <Transition name="slide-fade">
                        <a :style="[pointPositiveFlag[0] ? pointPositiveStyle : pointNegativeStyle]" v-if="pointChangeFlag[0]">{{ pointChangeListStr[0] }}</a>
                    </Transition>
                </div>
            </p>
            <p class="text" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(0).name }}</strong></p>
        </div>

        <div style="position: absolute; margin: auto; top: 2dvmin; left: 0; right: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40dvmin; height: 25dvmin; transform: rotate(180deg);">
            <t-button class="riichi" style="margin-bottom: -2dvmin"
                :theme="gameStore.getSeat(2).riichi ? 'primary' : 'light'" @click="onRiichi(2)">立直</t-button>
            <p class="title" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(2).seat }} {{
                gameStore.getSeat(2).point }}</strong>
                <div class="text" style="position: absolute; margin: auto; left: 43dvmin; right: 0; background-color: transparent; 
                display: flex; flex-direction: row; flex: 0 1 auto;">
                    <Transition name="slide-fade">
                        <a :style="[pointPositiveFlag[2] ? pointPositiveStyle : pointNegativeStyle]" v-if="pointChangeFlag[2]">{{ pointChangeListStr[2] }}</a>
                    </Transition>   
                </div> 
            </p>
            <p class="text" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(2).name }}</strong></p>
        </div>


        <div style="position: absolute; margin: auto; top: 0;  right: -5.5dvmin; bottom: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40dvmin; height: 25dvmin; transform: rotate(270deg);">
            <t-button class="riichi" style="margin-bottom: -2dvmin"
                :theme="gameStore.getSeat(1).riichi ? 'primary' : 'light'" @click="onRiichi(1)">立直</t-button>
            <p class="title" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(1).seat }} {{
                gameStore.getSeat(1).point }}</strong>
                <div class="text" style="position: absolute; margin: auto; left: 43dvmin; right: 0; background-color: transparent; 
                display: flex; flex-direction: row; flex: 0 1 auto;">
                    <Transition name="slide-fade">
                        <a :style="[pointPositiveFlag[1] ? pointPositiveStyle : pointNegativeStyle]" v-if="pointChangeFlag[1]">{{ pointChangeListStr[1] }}</a>
                    </Transition>    
                </div>
            </p>
            <p class="text" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(1).name }}</strong></p>
        </div>


        <div style="position: absolute; margin: auto; top: 0;  left: -5.5dvmin; bottom: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40dvmin; height: 25dvmin; transform: rotate(90deg);">
            <t-button class="riichi" style="margin-bottom: -2dvmin"
                :theme="gameStore.getSeat(3).riichi ? 'primary' : 'light'" @click="onRiichi(3)">立直</t-button>
            <p class="title" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(3).seat }} {{
                gameStore.getSeat(3).point }}</strong>
                <div class="text" style="position: absolute; margin: auto; left: 43dvmin; right: 0; background-color: transparent; 
                display: flex; flex-direction: row; flex: 0 1 auto;">
                    <Transition name="slide-fade">
                        <a :style="[pointPositiveFlag[3] ? pointPositiveStyle : pointNegativeStyle]" v-if="pointChangeFlag[3]">{{ pointChangeListStr[3] }}</a>
                    </Transition>    
                </div>
            </p>
            <p class="text" style="margin-bottom: 2dvmin"><strong>{{ gameStore.getSeat(3).name }}</strong></p>
        </div>

    </div>

    <div style="height: 10dvh; width: 100dvw; position: absolute; margin: auto; 
        bottom: 0; left: 0; right: 0; background-color: #aa96da;">
        <div style="position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;
              background-color: transparent; display: flex; justify-content: space-between; align-items: center;">
            <t-button class="actionButton" theme="light" @click="onTsumo">自摸</t-button>
            <t-button class="actionButton" theme="light" @click="onRon">荣和</t-button>
            <t-button class="actionButton" theme="light" @click="onRyuukyoku">流局</t-button>
            <t-button class="actionButton" theme="light" @click="onEdit">编辑</t-button>
            <t-button class="actionButton" theme="light" @click="onRevoke">撤销</t-button>
        </div>

    </div>

    <!-- <t-dialog v-model:visible="winState.tsumo">
        <t-picker v-model="winState.fanfu" :columns="fanfuList" @change="onTsumoConfirm" @cancel="onTsumoCancel" />
        <t-cell title="选择自摸玩家" borderless></t-cell>
        <t-radio-group v-model:value="winState.winner" @change="onTsumoRadioGroupChange">
            <t-radio v-for="playerName of gameStore.seatList" name="winner" :value="playerName" :label="playerName" />
        </t-radio-group>
    </t-dialog> -->

    <t-dialog style="--td-dialog-width: 90dvw; font-size: 14px;" v-model:visible="winState.tsumo" confirm-btn="确定"
        cancel-btn="取消" @confirm="onTsumoConfirm">

        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            content="选择番数" :prefix-icon="false" />

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
            content="选择符数" :prefix-icon="false" />

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
            content="选择自摸玩家" :prefix-icon="false" />

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


    <t-dialog style="--td-dialog-width: 90dvw; font-size: 14px;" v-model:visible="winState.ron" confirm-btn="确定"
        cancel-btn="取消" @confirm="onRonConfirm">
        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            content="选择荣和玩家" :prefix-icon="false" />
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
            content="选择放铳玩家" :prefix-icon="false" />

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
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat0FanChick" title="选择番数" close-btn :zIndex="15001">
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
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat0FuChick" title="选择符数" close-btn :zIndex="15001">
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
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat1FanChick" title="选择番数" close-btn :zIndex="15001">
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
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat1FuChick" title="选择符数" close-btn :zIndex="15001">
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
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat2FanChick" title="选择番数" close-btn :zIndex="15001">
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
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat2FuChick" title="选择符数" close-btn :zIndex="15001">
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
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat3FanChick" title="选择番数" close-btn :zIndex="15001">
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
    <t-dialog style="--td-dialog-width: 85dvw" v-model:visible="seat3FuChick" title="选择符数" close-btn :zIndex="15001">
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


    <t-dialog v-model:visible="winState.ryuukyoku" confirm-btn="确定" cancel-btn="取消" @confirm="onRyuukyokuConfirm"
        @cancel="onRyuukyokuCancel">
        <t-notice-bar style="font-size: 16px; text-align: left; font-weight: 300; border-radius: 8px" visible
            content="选择听牌玩家" :prefix-icon="false" />
        <t-checkbox-group style="--td-checkbox-border-color:none" v-model:value="winState.winners" :options="options"
            @change="onRyuukyokuCheckboxGroupChange" />
    </t-dialog>

    <t-dialog v-model:visible="editState.on">
        <t-picker v-model="editState.currentKyoku" :columns="kyokuListOptions" @change="onEditChange"
            @cancel="onEditCancel" />
        <t-row>
            <t-col span="12">
                <a>本场: </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.honba" type="number" class="dialog-input" clearable slot="content"
                    placeholder="输入本场" placeholder-class="placeholder" />
            </t-col>
        </t-row>
        <t-row>
            <t-col span="12">
                <a>供托(x1000): </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.kyoutaku" type="number" class="dialog-input" clearable slot="content"
                    placeholder="输入供托数" placeholder-class="placeholder" />
            </t-col>
        </t-row>
        <t-row v-for="(playerName, index) of gameStore.seatList" :key="index">
            <t-col span="12">
                <a>{{ playerName }}: </a>
            </t-col>
            <t-col span="12">
                <t-input v-model:value="editState.pointList[index]" type="number" class="dialog-input" clearable
                    slot="content" placeholder="输入点数" placeholder-class="placeholder" />
            </t-col>
        </t-row>
    </t-dialog>

    <t-dialog v-model:visible="revokeState.on" close-on-overlay-click content="撤销后无法回退，且仅能撤销一次，确认撤销吗？" cancel-btn="取消"
        :confirm-btn="{ content: '确定', theme: 'danger' }" @confirm="onRevokeConfirm" @cancel="onRevokeCancel"
        @close="onRevokeClose">
    </t-dialog>

    <t-dialog v-model:visible="finalState.on" title="终局结果" confirm-btn="确定" @confirm="onFinalConfirm">
        <p v-for="(playerName, index) of finalState.result" :key="index" class="text" style="margin-bottom: 2dvmin">
            <strong>{{ playerName }} : {{ gameStore.getPlayer(playerName).point }}</strong>
        </p>
    </t-dialog>

    <t-dialog v-model:visible="leave.showAlert" close-on-overlay-click content="现在退出不保存任何数据,确定吗?" cancel-btn="取消"
        :confirm-btn="{ content: '确定', theme: 'danger' }" @confirm="onConfirm" @cancel="onCancel" @close="onClose">
    </t-dialog>

</template>

<script lang="ts" setup>

import router from '@/router';
import type { HistoryData } from '@/stores/storage';
import { saveHistory, useGameStore } from '@/stores/storage';
import type { Player } from '@/ts/common';
import { Toast } from 'tdesign-mobile-vue';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { onBeforeRouteLeave, type RouteLocationNormalized } from 'vue-router';

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
const kyokuList = ['东一局', '东二局', '东三局', '东四局', '南一局', '南二局', '南三局', '南四局', '西一局', '西二局', '西三局', '西四局']
const kazeList = ['东', '南', '西', '北']
const fanList = ['一番', '两番', '三番', '四番', '满贯', '跳满', '倍满', '三倍满', '役满', '两倍役满', '三倍役满', '四倍役满', '五倍役满', '六倍役满']
const fuListStr = ['20符', '25符', '30符', '40符', '50符', '60符', '70符', '80符', '90符', '100符', '110符']
const fuList = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]
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
    fanfutsumo: { fan: '一番', fu: '30符' },
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
    winState.fanfutsumo = { fan: '一番', fu: '30符' }
    winState.fanfuRon = []
    for (let i = 0; i < 4; i++) {
        winState.fanfuRon.push({ fan: '一番', fu: '30符' })
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
            player.seat = kazeList[(i + 4 - gameStore.startSeat + 12 - currentKyoku.value) % 4]
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

    var allLast = 7
    // 东风战
    if (gameStore.gameType === 'eastWind') {
        allLast = 3
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
            if (gameStore.getPlayer(winPlayer).seat === '东') {
                oyaPlayer = gameStore.getPlayer(winPlayer)
                break
            }
        }

        if (gameStore.getPlayer(winState.winner).seat === '东') {
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
                else {
                    if (gameStore.continuingIntoWest) {
                        // 西四局，强制终局
                        if (currentKyoku.value >= kyokuList.length - 1) {
                            return true
                        }
                    }
                    else {
                        // 南四局，强制终局
                        if (currentKyoku.value >= 7) {
                            return true
                        }
                    }
                }
            }
        }
        else {
            //亲家未和了且流局未听牌
            // top低于返点，继续游戏（在强制终局前）
            if (topPoint < gameStore.returnPoint) {
                if (gameStore.continuingIntoWest) {
                    // 西四局，强制终局
                    if (currentKyoku.value >= kyokuList.length - 1) {
                        return true
                    }
                }
                else {
                    // 南四局，强制终局
                    if (currentKyoku.value >= 7) {
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

    console.log(pointChangeList)
    console.log(pointChangeFlag)
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
        Toast.error('未选择自摸玩家！')
        return
    }

    setRevokeState()

    var winPlayer = gameStore.getPlayer(winState.winner)
    var winFan = fanList.indexOf(winState.fanfutsumo.fan) + 1
    var winFu = fuList[fuListStr.indexOf(winState.fanfutsumo.fu)]
    var a = calculateA(winFan, winFu)

    var riichibous = 0
    if (winPlayer.seat === '东') {
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
            if (player.seat === '东') {
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
        Toast.error('未选择和了玩家！')
        return
    }
    if (winState.loser === '') {
        Toast.error('未选择放铳玩家！')
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
        if (winPlayers[i].seat === '东') {
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
        if (winPlayer.seat === '东') {
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
                pointChangeList[i] -= 1500
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
                pointChangeList[i] -= 3000
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

const onRyuukyokuCancel = () => {
    winState.ryuukyoku = false
}

// 编辑
const onEdit = () => {
    editState.on = true
}

const onEditChange = () => {
    if (!Number.isInteger(Number(editState.honba)) || Number(editState.honba) < 0 || editState.honba === '') {
        Toast.error('本场必须为大于0的整数！')
        return
    }
    if (!Number.isInteger(Number(editState.kyoutaku)) || Number(editState.kyoutaku) < 0 || editState.kyoutaku === '') {
        Toast.error('供托必须为大于0的整数！')
        return
    }

    for (const point of editState.pointList as string[]) {
        if (!Number.isInteger(Number(point)) || Number(point) % 100 != 0 || point === '') {
            Toast.error('分数必须为100的整数倍！')
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
        Toast.error('总分校验不通过！')
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
        player.seat = kazeList[(i + 4 - gameStore.startSeat + 12 - currentKyoku.value) % 4]
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
        player.seat = kazeList[(i + 4 - gameStore.startSeat + 12 - currentKyoku.value) % 4]
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
.actionButton {
    width: 10dvmin;
    height: 7dvmin;
    margin-left: 4dvmin;
    margin-right: 4dvmin;
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
    line-height: 0.5dvmin;
    text-align: center;
}

.text {
    font-size: 4dvmin;
    line-height: 0.8dvmin;
    text-align: center;
}

.score {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
    gap: 2px;
    --td-radio-vertical-padding: 0px;
}

.score>* {
    padding: 0px;
}

.score .card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 30px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1.5px solid #777;
}

.score .card--active {
    border-color: #0052d9;
}

.score .card--active::after {
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


.player-selecter {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
    gap: 5px;
    --td-radio-vertical-padding: 0px;
}

.player-selecter>* {
    padding: 0px;
}

.player-selecter .card {
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

.player-selecter .card--active {
    border-color: #0052d9;
}

.player-selecter .card--active::after {
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

