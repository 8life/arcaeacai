//判断是否在握手状态
var running = false
var lang = 'zh'
var userinfo = null;
var songtitle = null;
var scoresObj = {};
var scroes = [];
var scroesppt=undefined;
//这里是语言提示库
var translationData = {
    'Arcaea score prober': {
        zh: 'Arcaea查分器'
    },
    'User Code (9 digits)': {
        zh: '好友码（9位）',
        ja: 'フレンドコード'
    },
    "Submit": {
        zh: '开查！'
    },
    'PTT explained: ': {
        zh: 'PTT机制：'
    },
    'Invalid code': {
        zh: '无效id'
    },
    'Connecting': {
        zh: '正在连接'
    },
    'Connect failed': {
        zh: '连接失败'
    },
    'Request sent': {
        zh: '已发送请求'
    },
    'Queried, waiting for results...': {
        zh: '等待返回数据……'
    },
    'Completed': {
        zh: '完成'
    },
    'Error: ': {
        zh: '错误：'
    },
    'finding player': {
        zh: '查找玩家出错'
    },
    'retrieving data': {
        zh: '获取分数出错'
    },

    'User info': {
        zh: '玩家信息',
        ja: 'プレイヤー情報'
    },
    'Registered at: ': {
        zh: '注册于：',
        ja: '登録：'
    },
    'Chart constant': {
        zh: '谱面定数',
        ja: '譜面定数'
    },
    'Result rating': {
        zh: '成绩评价',
        ja: 'スコア評価'
    },
    'Cleared at': {
        zh: '取得日期',
        ja: 'クリア日期'
    },
    'Date added': {
        zh: '歌曲更新日期',
        ja: '曲追加日期'
    },
    'Best 30 average: ': {
        zh: 'Best 30 均值：',
        ja: 'Best 30 平均：'
    },
    'Recent top 10 average: ': {
        zh: 'Recent 前10 均值：',
        ja: 'Recent トップ10 平均：'
    },
    'Sort by: ': {
        zh: '排序：',
        ja: '表示順：'
    },
    'Export CSV': {
        zh: '导出CSV'
    },
    'Song': {
        zh: '曲目',
        ja: '曲名'
    },
    'Difficulty': {
        zh: '难度',
        ja: '難易度'
    },
    'Constant': {
        zh: '定数',
        ja: '定数'
    },
    'Score': {
        zh: '分数',
        ja: 'スコア'
    },
    'Rating': {
        zh: 'ptt',
        ja: 'ポテンシャル'
    },

    'Toolbox': {
        zh: '工具箱'
    },
    'Player name lookup (name/rank before 2019/03/14)': {
        zh: '玩家查找（2019/03/14前的玩家名/排名）',
        ja: 'プレイヤー名検索（2019/03/14より前の名前/ランク）'
    },
    'Rating calculator': {
        zh: '葡萄糖计算器',
        ja: 'ポテンシャル計算機'
    },
    'Fetch constants for manual calculate': {
        zh: '获取定数表',
        ja: 'ポテンシャル表取得'
    },
    'Score: ': {
        zh: '分数：',
        ja: 'スコア：'
    },
    'Selected chart: ': {
        zh: '已选谱面：',
        ja: '選んだ譜面：'
    },
    'Rating: ': {
        zh: 'ptt：',
        ja: 'ポテンシャル：'
    },
    'Fetched constants': {
        zh: '定数表',
        ja: 'ポテンシャル表'
    },
    'Found %num% player(s)': {
        zh: '匹配到%num%个玩家',
        ja: '%num% 件記録'
    },
    "Fair usage: Please use this page as you needed. Though we can't do anything if you abuse it, we still recommend and hope you use it fairly. ": {
        zh: '合理使用：请按需使用这个工具。虽然滥用了我也不能怎么样，但还是建议并希望合理地使用'
    },
    'Data collection: As you use this service, you agree that we will record your basic user info into our database, and use it to provide name lookup service. ': {
        zh: '数据收集：在使用此服务时，您即同意我们记录并更新您的基本用户信息，并以此提供用户名查找服务。'
    },
    'Record date: ': {
        zh: '记录时间：',
        ja: '記録時間：'
    },
    'Select lookup history': {
        zh: '选择历史查询',
        ja: '検索履歴'
    },
    'Score-Rating chart': {
        zh: '分数-评分图'
    },
    'Show score rating chart': {
        zh: '显示分数-评分图'
    },
    'Probe range: ': {
        zh: '查分范围：',
        ja: 'スコア取得範囲：'
    },
    'Can select up to 4 levels': {
        zh: '最多可以选择4个难度',
        ja: '４レベルまで選択できる'
    },
    'Potential is hidden': {
        zh: 'ptt已被隐藏',
        ja: 'ポテンシャルは表示しない'
    },
    '_FUN_FACT_1_': {
        en: 'Fun fact: As of Sep 1st, there’re total 73 players achieved double star (PTT ≥ 12.50) (36 players as of Jun 25th)',
        zh: '趣事：截止9/1，一共有73人摘双星（6/25时为36人）'
    },
    '_FUN_FACT_2_': {
        en: 'We looked at 230+ players in our database previously recorded as above 12.25, and updated their status. Though some of them hid their potential value, thus we don\'t know these players\' current potential',
        zh: '我们查看了数据库之前记录的高于 12.25 的 230+ 位玩家，并更新了他们的数据。不过其中有一部分玩家隐藏了ptt，所以也就无从得知这部分玩家的当前ptt'
    }
};
//错误数据库
var errors = {
    add: 'finding player',
    fetch: 'retrieving data',
    potential_hidden: 'Potential is hidden'
};


//获取提示信息
function _t(s, l) {
    return (translationData[s] != undefined && translationData[s][l] != undefined) ? translationData[s][l] : s;
}

function check(i) {
    return (i < 10 ? "0" : "") + i;
  }