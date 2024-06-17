
const skyRollSpeed = 4;



const { ccclass, property } = cc._decorator;
@ccclass
export default class BgRollCtrl extends cc.Component {

    @property([cc.Node])
    bgList: Array<cc.Node> = [];

    @property([cc.Node])
    skyList: Array<cc.Node> = [];


    public rollSpeed: number = 0;

    public isStop: boolean = true;

    onLoad() {
        this.rollSpeed = 10;
        this.isStop = true;
        // cc.systemEvent.on('setBgRollState', this.updateBgRollState, this);
    }

    bgRoll() {
        this.bgList[0].x -= this.rollSpeed;
        this.bgList[1].x -= this.rollSpeed;
        if (this.bgList[0].x <= -this.bgList[0].width) {
            this.bgList[0].x += this.bgList[0].width * 2;
        }

        if (this.bgList[1].x <= -this.bgList[1].width) {
            this.bgList[1].x += this.bgList[1].width * 2;
        }
    }

    skyRoll() {
        this.skyList[0].x -= skyRollSpeed;
        this.skyList[1].x -= skyRollSpeed;
        if (this.skyList[0].x <= -this.skyList[0].width) {
            this.skyList[0].x += this.skyList[0].width * 2;
        }

        if (this.skyList[1].x <= -this.skyList[1].width) {
            this.skyList[1].x += this.skyList[1].width * 2;
        }
    }


    /** 设置背景的滚动速度 */
    setRollSpeed(num) {
        this.rollSpeed = num;
    }

    resetBgPosition() {
        this.bgList[0].x = 0;
        this.bgList[1].x = this.bgList[1].width;
        this.isStop = true;
    }

    /** 设置背景状态 */
    setBgRollState(val = true) {
        this.isStop = val;
    }

    update() {
        if (this.isStop) {
            return;
        }
        this.skyRoll();
        this.bgRoll();
    }

}