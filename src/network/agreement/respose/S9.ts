/**
 * 人满通知
 */
class S9 {
    public parseData(obj: any) {
        if (!obj) return;

        var type: number = +obj.data.type;

        switch (type) {
            case 1://通知房主开启游戏
                break;
            case 2://轮到谁
                console.log("轮到谁抓牌:", obj.data.data.pos);

                var pos: number = +obj.data.data.pos;
                var dui_num: number = obj.data.data.dui_num;
                var gang_end = obj.data.data.gang_end;

                GSDataProxy.i.S2C_TurnDir(pos, dui_num, gang_end);
                gameCore.gameManager.dispatchEvent(EffectEvent.Chupai);
                break;
            case 3://触发中断
                console.log("显示功能菜单:", obj.data.data);

                var d = obj.data.data;

                GSDataProxy.i.S2C_Function(d);
                break;
            case 4://别人触发中断
                console.log("同步其他方功能牌", obj);

                GSDataProxy.i.S2C_FuncResult(obj.data.data.action, obj.data.data.pai, obj.data.data.turn, obj.data.data.cur);
                gameCore.gameManager.dispatchEvent(EffectEvent.Chupai);
                gameCore.gameManager.dispatchEvent(EffectEvent.ChupaiTips);
                break;
            case 5: //补杠被劫
                console.log("删除手牌", obj);

                GSDataProxy.i.S2C_DeletePai(obj.data.data.pos, obj.data.data.pai);
                break;
            case 6://补杠提示
                gameCore.gameManager.dispatchEvent(EffectEvent.Chupai, [GSData.i.getDir(obj.data.data.pos), obj.data.data.pai]);
                break;
            case 7://换三张
                PublicVal.state = GameState.changeThree;

                gameCore.gameManager.dispatchEvent(EffectEvent.RaiseCards, RaiseCardsType.changeThree);
                break;
            case 8://订缺
                PublicVal.state = GameState.missing;

                gameCore.gameManager.dispatchEvent(EffectEvent.Missing);
                break;
            case 9://有人提交了换三张
                PublicVal.state = GameState.changeThree;
                break;
        }
    }
}