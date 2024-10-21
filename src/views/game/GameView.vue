<template>
    <div style="height: 90vh; width: 100vw; position: absolute; margin: auto; 
        top: 0; left: 0; right: 0; background-color: #fcbad3;">

        <div style="position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;
              background-color: blanchedalmond; display: table; border-radius: 3vmin">
            <p class="title"><strong>{{ kyokuList[currentKyoku] }}</strong></p>
            <p class="text"><strong>{{ honBa }}本场</strong></p>
            <p class="text"><strong>{{ kyoutaku * 1000 }}供托</strong></p>
        </div>

        <div style="position: absolute; margin: auto; left: 0; right: 0; bottom: 2vmin;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40vmin; height: 25vmin;">
            <t-button class="richi" style="margin-bottom: -2vmin" theme="light">立直</t-button>
            <p class="title" style="margin-bottom: 2vmin"><strong>{{ player1 }} 24000</strong></p>
            <p class="text" style="margin-bottom: 2vmin"><strong>牌搭子1</strong></p>
        </div>

        <div style="position: absolute; margin: auto; top: 2vmin; left: 0; right: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40vmin; height: 25vmin; transform: rotate(180deg);">
            <t-button class="richi" style="margin-bottom: -2vmin" theme="light">立直</t-button>
            <p class="title" style="margin-bottom: 2vmin"><strong>{{ player2 }} 25000</strong></p>
            <p class="text" style="margin-bottom: 2vmin"><strong>牌搭子2</strong></p>
        </div>


        <div style="position: absolute; margin: auto; top: 0;  right: -5.5vmin; bottom: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40vmin; height: 25vmin; transform: rotate(270deg);">
            <t-button class="richi" style="margin-bottom: -2vmin" theme="light">立直</t-button>
            <p class="title" style="margin-bottom: 2vmin"><strong>{{ player3 }} 25000</strong></p>
            <p class="text" style="margin-bottom: 2vmin"><strong>牌搭子3</strong></p>
        </div>


        <div style="position: absolute; margin: auto; top: 0;  left: -5.5vmin; bottom: 0;
              background-color: transparent; display: flex; flex-direction: column; flex: 0 1 auto;
              width: 40vmin; height: 25vmin; transform: rotate(90deg);">
            <t-button class="richi" style="margin-bottom: -2vmin" theme="light">立直</t-button>
            <p class="title" style="margin-bottom: 2vmin"><strong>{{ player4 }} 25000</strong></p>
            <p class="text" style="margin-bottom: 2vmin"><strong>牌搭子4</strong></p>
        </div>

    </div>

    <div style="height: 10vh; width: 100vw; position: absolute; margin: auto; 
        bottom: 0; left: 0; right: 0; background-color: #aa96da;">
        <div style="position: absolute; margin: auto; top: 0; left: 0; right: 0; bottom: 0;
              background-color: transparent; display: table;">
            <t-button class="actionButton" theme="light">自摸</t-button>
            <t-button class="actionButton" theme="light">和</t-button>
            <t-button class="actionButton" theme="light">流局</t-button>
            <t-button class="actionButton" theme="light">编辑</t-button>
            <t-button class="actionButton" theme="light">撤销</t-button>
        </div>

    </div>

    <t-dialog v-model:visible="leave.showAlert" close-on-overlay-click content="现在退出不保存任何数据,确定吗?" cancel-btn="取消"
        :confirm-btn="{ content: '确定', theme: 'danger' }" @confirm="onConfirm" @cancel="onCancel" @close="onClose">
    </t-dialog>

</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { onBeforeRouteLeave, type RouteLocationNormalized } from 'vue-router';
import { player } from '../../ts/common.ts'

// 局内逻辑
const kyokuList = ["东一局", "东二局", "东三局", "东四局", "南一局", "南二局", "南三局", "南四局", "西一局", "西二局", "西三局", "西四局"]
const currentKyoku = ref(0)
const honBa = ref(0)
const kyoutaku = ref(0)


// 界面逻辑
const leave = ref({
    showAlert: false,
    to: {} as RouteLocationNormalized,
    next: {} as Function
})

onBeforeRouteLeave((to, from, next) => {
    leave.value.showAlert = true
    leave.value.to = to
    leave.value.next = next
});


const onConfirm = () => {
    leave.value.next()
};

const onCancel = () => {
    leave.value.next(false)
};

const onClose = () => {
    console.log('dialog: close');
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
    width: 10vmin;
    height: 7vmin;
    margin-left: 4vmin;
    margin-right: 4vmin;
}


.richi {
    width: 20vmin;
    height: 10vmin;
    margin: auto;
    right: 0;
    left: 0;
}

.title {
    font-size: 8vmin;
    line-height: 0.5vmin;
    text-align: center;
}

.text {
    font-size: 4vmin;
    line-height: 0.8vmin;
    text-align: center;
}
</style>