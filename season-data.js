/* New project course; original data.js and its eight course IDs stay unchanged. */
window.BLUEPRINT_COURSES.push({
  "id": "season-challenge-ui",
  "module": "UMG 实战",
  "level": "项目重构",
  "minutes": 180,
  "title": "赛季挑战 UI 重构实战",
  "description": "从实际 UE 工程学习组件拆分、背景悬浮、奖励与条件联动，以及不改功能的蓝图整理。",
  "badge": "实际 UE 5.8.4 工程 · 8 节实操 / 38 小步",
  "outcome": "三张任务卡悬浮时背景等比放大且不出框；导航独立绿色反馈；左右切换奖励时，标题、分页与达成条件同步更新。",
  "premise": "安装并使用 UE 5.8.4；本项目未验证向 5.8.2 降级。 下载工程源码并保留原始副本；SourceArt 为可选重导入源，不影响运行。 先理解 UMG Widget、变量 Get/Set、白色执行线和彩色数据线。",
  "concept": "基于已经完成的赛季挑战 UMG 工程。学习网站展示实际运行截图与可跟做步骤；不会在浏览器运行 UE，也不会自动检测你的编辑器。项目进度与奖励为本地演示数据。",
  "flow": [
    "保存行为与视觉基线",
    "拆清组件与数据",
    "只给背景绑定悬浮动画",
    "单索引提交奖励与条件",
    "处理文本测量与虚拟化",
    "保守精简节点并排版",
    "三档回归与干净交付"
  ],
  "nodes": [
    {
      "label": "Play Animation / Reverse Animation",
      "type": "工程函数 / 节点",
      "desc": "播放已有 UMG 动画，背景缩放不依赖 Tick 插值。"
    },
    {
      "label": "RequestStageDelta（工程函数）",
      "type": "工程函数 / 节点",
      "desc": "主页面接收上一页或下一页请求。"
    },
    {
      "label": "CommitStage（工程函数）",
      "type": "工程函数 / 节点",
      "desc": "提交合法索引，统一更新奖励和达成条件。"
    },
    {
      "label": "On List Item Object Set",
      "type": "工程函数 / 节点",
      "desc": "虚拟化条目每次分配数据时重写完整外观。"
    }
  ],
  "steps": [
    {
      "title": "打开交付工程，建立可比较的基线",
      "body": "先确认现状，再调整结构。",
      "help": "不要用旧版引擎直接覆盖工程；本交付验证版本为 5.8.4，未承诺向 5.8.2 降级兼容。"
    },
    {
      "title": "拆清职责与三层容器约束",
      "body": "让重复元素复用，避免多套布局。",
      "help": "蓝图图表节点数与 UMG 容器层级是两种统计；减少图表节点不等于降低控件层级。"
    },
    {
      "title": "悬浮只放大背景，点击只反馈边框",
      "body": "进入框内放大，离开恢复，文字始终不缩放。",
      "help": "检查图片是否抢占命中、装饰是否 HitTestInvisible、根可交互性、输入模式与 Owner 引用；不要只在 Designer 预览动画。"
    },
    {
      "title": "奖励、标题、分页与条件作为一次切换",
      "body": "一个合法索引驱动所有相关内容。",
      "help": "箭头可见但点不动时，先检查命中遮挡、委托绑定和 Owner；只改图片或只改标题都不算完成切页。"
    },
    {
      "title": "虚拟化条目与多语言文字不重叠",
      "body": "条目被复用时完整刷新，正文随内容增高。",
      "help": "预期尺寸为零时检查是否在文字更新前就读取；可安排一次延后布局刷新，不要每帧强制 Prepass。"
    },
    {
      "title": "三档布局与进度自动更新",
      "body": "固定左中列，右列吸收宽度，进度不由点击增加。",
      "help": "课程中的尺寸是本工程最终标定值，不是最初草案；不要把 3100×1440 宽屏误记为 2560×1440。"
    },
    {
      "title": "整理节点与注释，先证明行为没变",
      "body": "只做有依据的精简，保留接口与执行顺序。",
      "help": "本次自动排版用保守包围范围核验，仍应在编辑器中目视检查；不要把估算范围称为实际节点像素测量。"
    },
    {
      "title": "整理为可评审的工程交付",
      "body": "让另一台电脑能打开、运行并找到修改入口。",
      "help": "Cook 成功不等于已生成 Windows 可执行文件；本页提供工程源码，不把静态截图当成录屏。"
    }
  ],
  "params": [
    [
      "WBP_InteractiveBase",
      "交互基类",
      "保存悬浮、按下、选中与禁用状态"
    ],
    [
      "DA_ExactLayout_*",
      "三档布局数据",
      "左中固定、右侧弹性及间距"
    ],
    [
      "DA_Stage_01 / 02 / 03",
      "阶段数据资产",
      "奖励、标题与 Objectives 同源"
    ],
    [
      "DA_TaskCardFeedbackStyle",
      "样式资产",
      "任务卡白边与反馈"
    ],
    [
      "DA_ConditionsStyle",
      "字体 / 颜色样式",
      "标题 43px Bold，正文 32px Medium / 48px 行高"
    ],
    [
      "DA_ActionPlanProgress",
      "进度数据",
      "星数、阈值与自动解锁"
    ],
    [
      "ST_SeasonChallenge / _en / _ja",
      "String Table",
      "中、英、日 FText 与格式化句式"
    ]
  ],
  "pitfalls": [
    [
      "卡片悬浮没反应或一直抖动",
      "核对命中层、实际 Geometry 与 bHovered 的状态改变判断；动画只绑定 IMG_Artwork，内部移动不能反复 Play Animation。 验证：在独立运行窗口进入、停留、离开各卡片，背景稳定到达 1.2 后回到 1。"
    ],
    [
      "箭头点击不切页或条件没有跟着换",
      "先检查原生按钮委托和 OwnerScreen，再沿 RequestStageDelta、离场完成、CommitStage 查看奖励与条件是否同一提交路径。 验证：按 0→1→2→1→0 逐页核对标题、奖励、分页点与条件条数。"
    ],
    [
      "条件文字重叠或滚动残留",
      "在每次条目分配时刷新完整状态；更新换行后再测量文字行高；数据切换重置列表选择和滚动位置。 验证：三条、单条、多条切换，加长 50% 并切英文/日文，逐行核对。"
    ],
    [
      "重构后节点少了，但行为变了",
      "对照执行连接、变量写入边界、默认引脚值与调用副作用；恢复未经证明的合并，不能仅靠编译成功判断。 验证：同一数据、同一输入下重跑三档反馈、分页和进度回归，结果与基线一致。"
    ]
  ],
  "check": "三个参考窗口中验证悬浮、白边、奖励与条件同步、首尾保护及长文换行；个人勾选不自动检测 UE。",
  "project": true
});
window.SEASON_PROJECT={
  "chapters": [
    {
      "title": "打开交付工程，建立可比较的基线",
      "where": "SeasonChallenge.uproject → WBP_SeasonChallengeScreen",
      "actions": [
        "下载本页的 UE 工程源码包，完整解压到可写目录，用 UE 5.8.4 打开 SeasonChallenge.uproject。首次打开等待缓存与着色器生成。",
        "点击 Play，分别用 2560×1440、2560×1792、3100×1440 独立窗口运行，保存自己的基线截图。",
        "在内容浏览器打开 /Game/UI/Widgets/WBP_SeasonChallengeScreen，分别查看 Designer 与 Graph；在 Docs 中打开蓝图、函数、变量清单。",
        "先复制一份工程作为练习副本。记录公共函数参数、变量默认值、动画绑定、三页条件及当前视觉；后续只修改练习副本。"
      ],
      "wires": [
        [
          "ApplyVisualState（工程覆盖函数）",
          "WBP_InteractiveBase 保存交互状态；导航子类应用绿色；任务卡只应用白边；状态优先级保留 Disabled 与 Pressed 分支。"
        ]
      ],
      "expect": "能启动三档窗口，并指出样式、阶段数据和交互入口分别在哪。",
      "fix": "不要用旧版引擎直接覆盖工程；本交付验证版本为 5.8.4，未承诺向 5.8.2 降级兼容。",
      "nodeKeys": [
        "state"
      ],
      "blueprintFlow": [
        [
          "入口页面",
          "组合可复用组件"
        ],
        [
          "样式与阶段数据",
          "集中定义"
        ],
        [
          "基线截图与清单",
          "作为回归依据"
        ]
      ],
      "walk": {
        "caseId": "season-challenge-ui",
        "place": "SeasonChallenge.uproject → WBP_SeasonChallengeScreen",
        "goal": "先确认现状，再调整结构。",
        "steps": [
          {
            "action": "下载本页的 UE 工程源码包，完整解压到可写目录，用 UE 5.8.4 打开 SeasonChallenge.uproject。首次打开等待缓存与着色器生成。",
            "see": "默认打开 L_SeasonChallenge；工程没有 C++ 模块或第三方插件要求。",
            "tip": "不要用旧版引擎直接覆盖工程；本交付验证版本为 5.8.4，未承诺向 5.8.2 降级兼容。"
          },
          {
            "action": "点击 Play，分别用 2560×1440、2560×1792、3100×1440 独立窗口运行，保存自己的基线截图。",
            "see": "三个窗口都显示行动计划、收集者、命运契约与奖励条件面板。",
            "tip": "不要用旧版引擎直接覆盖工程；本交付验证版本为 5.8.4，未承诺向 5.8.2 降级兼容。"
          },
          {
            "action": "在内容浏览器打开 /Game/UI/Widgets/WBP_SeasonChallengeScreen，分别查看 Designer 与 Graph；在 Docs 中打开蓝图、函数、变量清单。",
            "see": "能从主页面找到 WBP_TaskCard、WBP_StageReward 与 WBP_ObjectiveEntry。",
            "tip": "不要用旧版引擎直接覆盖工程；本交付验证版本为 5.8.4，未承诺向 5.8.2 降级兼容。"
          },
          {
            "action": "先复制一份工程作为练习副本。记录公共函数参数、变量默认值、动画绑定、三页条件及当前视觉；后续只修改练习副本。",
            "see": "手里有能恢复的基线与一张必须保持的功能清单。",
            "tip": "不要用旧版引擎直接覆盖工程；本交付验证版本为 5.8.4，未承诺向 5.8.2 降级兼容。"
          }
        ],
        "key": "main-0"
      }
    },
    {
      "title": "拆清职责与三层容器约束",
      "where": "Widgets / Styles / Data → Designer 与公共函数",
      "actions": [
        "打开 WBP_InteractiveBase、WBP_NavItem、WBP_TaskCard，沿继承关系查看输入事件和 ApplyVisualState。",
        "在主页面中查看网格、卡片、奖励和条件的组合；背景叠层检查 Canvas Panel 的 ZOrder。不要添加 Overlay 或 Widget Switcher。",
        "展开每个嵌套 UserWidget，把它实际引入的 Panel / Content 容器也累计；Text、Image 和 WBP 资产边界不能用来重置深度。",
        "在 DA_TaskCardFeedbackStyle、DA_ConditionsStyle、DA_StageHeaderStyle 中改一项练习参数，再运行确认它影响相应组件；验收后恢复。"
      ],
      "wires": [
        [
          "ApplyVisualState（工程覆盖函数）",
          "WBP_InteractiveBase 保存交互状态；导航子类应用绿色；任务卡只应用白边；状态优先级保留 Disabled 与 Pressed 分支。"
        ]
      ],
      "expect": "同类组件可复用，累计深度符合约束，样式不会从多个事件互相覆盖。",
      "fix": "蓝图图表节点数与 UMG 容器层级是两种统计；减少图表节点不等于降低控件层级。",
      "nodeKeys": [
        "state"
      ],
      "blueprintFlow": [
        [
          "公共输入",
          "WBP_InteractiveBase"
        ],
        [
          "各组件外观",
          "覆盖 ApplyVisualState"
        ],
        [
          "数据资产",
          "集中样式与内容"
        ]
      ],
      "walk": {
        "caseId": "season-challenge-ui",
        "place": "Widgets / Styles / Data → Designer 与公共函数",
        "goal": "让重复元素复用，避免多套布局。",
        "steps": [
          {
            "action": "打开 WBP_InteractiveBase、WBP_NavItem、WBP_TaskCard，沿继承关系查看输入事件和 ApplyVisualState。",
            "see": "公共状态在基类；导航和卡片分别处理自己的颜色与边框。",
            "tip": "蓝图图表节点数与 UMG 容器层级是两种统计；减少图表节点不等于降低控件层级。"
          },
          {
            "action": "在主页面中查看网格、卡片、奖励和条件的组合；背景叠层检查 Canvas Panel 的 ZOrder。不要添加 Overlay 或 Widget Switcher。",
            "see": "同一套 WBP 用于标准、平板和宽屏。",
            "tip": "蓝图图表节点数与 UMG 容器层级是两种统计；减少图表节点不等于降低控件层级。"
          },
          {
            "action": "展开每个嵌套 UserWidget，把它实际引入的 Panel / Content 容器也累计；Text、Image 和 WBP 资产边界不能用来重置深度。",
            "see": "最深视觉路径累计容器数不超过 3。",
            "tip": "蓝图图表节点数与 UMG 容器层级是两种统计；减少图表节点不等于降低控件层级。"
          },
          {
            "action": "在 DA_TaskCardFeedbackStyle、DA_ConditionsStyle、DA_StageHeaderStyle 中改一项练习参数，再运行确认它影响相应组件；验收后恢复。",
            "see": "样式有统一入口，不需要在每个事件里复制同一个颜色或字号。",
            "tip": "蓝图图表节点数与 UMG 容器层级是两种统计；减少图表节点不等于降低控件层级。"
          }
        ],
        "key": "main-1"
      }
    },
    {
      "title": "悬浮只放大背景，点击只反馈边框",
      "where": "WBP_TaskCard → IMG_Artwork / GetHoverAnimation / ApplyVisualState",
      "actions": [
        "在 Designer 选 IMG_Artwork，确认图片区域与卡片根启用边界裁剪，图片使用等比适配；CP_Root 与文字 Render Scale 保持 (1,1)。",
        "打开 GetHoverAnimation 返回的动画；查看 0→0.18 秒，IMG_Artwork 的 Scale 从 (1,1) 变为 (1.2,1.2)，不添加文字与根节点轨道。",
        "沿 HandleHoverEnter / HandleHoverLeave 检查 bHovered 更新和动画播放。On Mouse Move 用实际 Geometry 与指针屏幕坐标校验，只有状态改变才启动动画。",
        "沿 ApplyVisualState 查看 Top / Bottom / Left / Right 白边；导航的绿色留在导航子类里。按下、抬起和禁用都应明确刷新外观。",
        "在 Play 独立窗口从卡片外进入、停留、跨到另一个卡片，再移出；逐一检查三个框。"
      ],
      "wires": [
        [
          "On Mouse Enter / On Mouse Leave",
          "WBP_TaskCard 的公共 HandleHoverEnter / HandleHoverLeave 进入交互基类；只在 bHovered 改变时启动或反向播放动画。"
        ],
        [
          "On Mouse Move / Is Under Location",
          "Geometry 与屏幕坐标接 Is Under Location；与旧 bHovered 比较，不相同才进入悬浮或离开路径；不能每次移动都重播动画。"
        ],
        [
          "Play Animation / Reverse Animation",
          "WBP_TaskCard.GetHoverAnimation 提供动画；时间轴只绑定 IMG_Artwork 的 Render Transform.Scale，0 秒=1、0.18 秒=1.2。"
        ],
        [
          "Set Clipping / Set Render Scale",
          "先在任务卡根与图片区域检查裁剪；只改 IMG_Artwork，CP_Root、TXT_Label 与边线 Scale 保持 (1,1)。"
        ],
        [
          "ApplyVisualState（工程覆盖函数）",
          "WBP_InteractiveBase 保存交互状态；导航子类应用绿色；任务卡只应用白边；状态优先级保留 Disabled 与 Pressed 分支。"
        ]
      ],
      "expect": "三个入口悬浮均有效，连续移动不重启动画，点击无绿色污染。",
      "fix": "检查图片是否抢占命中、装饰是否 HitTestInvisible、根可交互性、输入模式与 Owner 引用；不要只在 Designer 预览动画。",
      "nodeKeys": [
        "hover",
        "geometry",
        "animation",
        "clip",
        "state"
      ],
      "blueprintFlow": [
        [
          "指针进入或离开",
          "只在状态变化时处理"
        ],
        [
          "悬浮动画",
          "只绑定 IMG_Artwork"
        ],
        [
          "裁剪与白边",
          "留在原框内"
        ]
      ],
      "walk": {
        "caseId": "season-challenge-ui",
        "place": "WBP_TaskCard → IMG_Artwork / GetHoverAnimation / ApplyVisualState",
        "goal": "进入框内放大，离开恢复，文字始终不缩放。",
        "steps": [
          {
            "action": "在 Designer 选 IMG_Artwork，确认图片区域与卡片根启用边界裁剪，图片使用等比适配；CP_Root 与文字 Render Scale 保持 (1,1)。",
            "see": "背景可以放大，图片不会越过卡片边框。",
            "tip": "检查图片是否抢占命中、装饰是否 HitTestInvisible、根可交互性、输入模式与 Owner 引用；不要只在 Designer 预览动画。"
          },
          {
            "action": "打开 GetHoverAnimation 返回的动画；查看 0→0.18 秒，IMG_Artwork 的 Scale 从 (1,1) 变为 (1.2,1.2)，不添加文字与根节点轨道。",
            "see": "动画时间轴只影响背景。",
            "tip": "检查图片是否抢占命中、装饰是否 HitTestInvisible、根可交互性、输入模式与 Owner 引用；不要只在 Designer 预览动画。"
          },
          {
            "action": "沿 HandleHoverEnter / HandleHoverLeave 检查 bHovered 更新和动画播放。On Mouse Move 用实际 Geometry 与指针屏幕坐标校验，只有状态改变才启动动画。",
            "see": "框内移动不会不断把动画重置到第一帧。",
            "tip": "检查图片是否抢占命中、装饰是否 HitTestInvisible、根可交互性、输入模式与 Owner 引用；不要只在 Designer 预览动画。"
          },
          {
            "action": "沿 ApplyVisualState 查看 Top / Bottom / Left / Right 白边；导航的绿色留在导航子类里。按下、抬起和禁用都应明确刷新外观。",
            "see": "任务卡点击四周白边，导航选中绿色；两者不串色。",
            "tip": "检查图片是否抢占命中、装饰是否 HitTestInvisible、根可交互性、输入模式与 Owner 引用；不要只在 Designer 预览动画。"
          },
          {
            "action": "在 Play 独立窗口从卡片外进入、停留、跨到另一个卡片，再移出；逐一检查三个框。",
            "see": "背景到达 1.2 后稳定，离开回到 1；所有文字、框的尺寸保持。",
            "tip": "检查图片是否抢占命中、装饰是否 HitTestInvisible、根可交互性、输入模式与 Owner 引用；不要只在 Designer 预览动画。"
          }
        ],
        "key": "main-2"
      }
    },
    {
      "title": "奖励、标题、分页与条件作为一次切换",
      "where": "WBP_SeasonChallengeScreen → RequestStageDelta / CommitStage",
      "actions": [
        "从左右箭头查到 OwnerScreen，再到 RequestStageDelta。左箭头传 -1、右箭头传 +1；赛季目标标题自身不是翻页按钮。",
        "在 RequestStageDelta 逐个检查空数据、首尾、bTransitioning 保护。Length>0 后再计算并校验目标索引；首尾不取模、不循环。",
        "沿离场完成路径查 CommitStage；确认当前索引提交后调用 StageReward.ApplyStage 和主页面 RefreshStageConditions，再播放入场。",
        "查看 DA_Stage_01 / 02 / 03 的 Objectives。第二奖励是完成最终任务并领奖的一条条件；最后奖励标题为赛季目标二，对应权限、6 次委托、7 个契约。",
        "检查边界箭头透明度、交互开关与槽位；隐藏使用透明度 0 和不可命中，保留槽位，不使用 Collapsed。"
      ],
      "wires": [
        [
          "RequestStageDelta（工程函数）",
          "箭头控件通知 OwnerScreen；WBP_SeasonChallengeScreen.RequestStageDelta 先核验数据、边界与 bTransitioning，再开始离场。"
        ],
        [
          "Clamp (Integer) / Is Valid Index",
          "先 Length>0，再 Clamp；访问数组前 Is Valid Index。空数组的 Length−1=-1，不能当作有效索引继续 Get。"
        ],
        [
          "CommitStage（工程函数）",
          "离场完成 → CommitStage → StageReward.ApplyStage + Screen.RefreshStageConditions → 入场；不要给两块区域各维护一个索引。"
        ]
      ],
      "expect": "逐页来回和快速连点都保持奖励与条件一致，首页/末页边界正确。",
      "fix": "箭头可见但点不动时，先检查命中遮挡、委托绑定和 Owner；只改图片或只改标题都不算完成切页。",
      "nodeKeys": [
        "delta",
        "clamp",
        "commit"
      ],
      "blueprintFlow": [
        [
          "请求与边界检查",
          "拒绝重入与越界"
        ],
        [
          "离场 → CommitStage",
          "一次提交索引"
        ],
        [
          "奖励 + 条件刷新",
          "再入场并释放保护"
        ]
      ],
      "walk": {
        "caseId": "season-challenge-ui",
        "place": "WBP_SeasonChallengeScreen → RequestStageDelta / CommitStage",
        "goal": "一个合法索引驱动所有相关内容。",
        "steps": [
          {
            "action": "从左右箭头查到 OwnerScreen，再到 RequestStageDelta。左箭头传 -1、右箭头传 +1；赛季目标标题自身不是翻页按钮。",
            "see": "请求只从合法输入入口进入，箭头委托确实绑定主页面。",
            "tip": "箭头可见但点不动时，先检查命中遮挡、委托绑定和 Owner；只改图片或只改标题都不算完成切页。"
          },
          {
            "action": "在 RequestStageDelta 逐个检查空数据、首尾、bTransitioning 保护。Length>0 后再计算并校验目标索引；首尾不取模、不循环。",
            "see": "第一页不能向左、最后一页不能向右，快速连点不会跳出数组。",
            "tip": "箭头可见但点不动时，先检查命中遮挡、委托绑定和 Owner；只改图片或只改标题都不算完成切页。"
          },
          {
            "action": "沿离场完成路径查 CommitStage；确认当前索引提交后调用 StageReward.ApplyStage 和主页面 RefreshStageConditions，再播放入场。",
            "see": "图片、标题、说明、分页点与达成条件更新到同一页。",
            "tip": "箭头可见但点不动时，先检查命中遮挡、委托绑定和 Owner；只改图片或只改标题都不算完成切页。"
          },
          {
            "action": "查看 DA_Stage_01 / 02 / 03 的 Objectives。第二奖励是完成最终任务并领奖的一条条件；最后奖励标题为赛季目标二，对应权限、6 次委托、7 个契约。",
            "see": "第二页 1 条、第三页 3 条，切回首页恢复原始条件。",
            "tip": "箭头可见但点不动时，先检查命中遮挡、委托绑定和 Owner；只改图片或只改标题都不算完成切页。"
          },
          {
            "action": "检查边界箭头透明度、交互开关与槽位；隐藏使用透明度 0 和不可命中，保留槽位，不使用 Collapsed。",
            "see": "单侧箭头消失时，奖励图与另一侧箭头不偏移。",
            "tip": "箭头可见但点不动时，先检查命中遮挡、委托绑定和 Owner；只改图片或只改标题都不算完成切页。"
          }
        ],
        "key": "main-3"
      }
    },
    {
      "title": "虚拟化条目与多语言文字不重叠",
      "where": "RefreshStageConditions / WBP_ObjectiveEntry / String Table",
      "actions": [
        "查看条件 ListView 的 Entry Widget Class，进入 WBP_ObjectiveEntry，确认实现 User Object List Entry。",
        "沿 On List Item Object Set 检查每次分配都重写文本、Current/Target、完成图标与状态；不要只在 Construct 初始化。",
        "打开 ST_SeasonChallenge、_en、_ja 与富文本样式表。条件标题使用 Bold 43px，任务 Medium 32px/48px；TaskAccent 区分三个任务关键词。",
        "正文 Auto Wrap，更新后按 Desired Size 安排行高；标题方形、连接线与任务状态图不重叠。目标指引保持在 515×72 基准框内居中。",
        "在练习数据里增加 +50% 长文、切换英文和日文，再插入足够多条目测试滚动；切页后回到顶部。"
      ],
      "wires": [
        [
          "Set List Items",
          "RefreshStageConditions 重建当前页的条目数据并重置选择、滚动位置；内容不足一屏时不强制造出可拖动范围。"
        ],
        [
          "On List Item Object Set",
          "WBP_ObjectiveEntry 实现 User Object List Entry；验证并读取条目对象，重写富文本、完成数、状态图、选中与禁用表现。"
        ],
        [
          "Format Text / SetText (Text)",
          "FText 格式化进度；TaskAccent 富文本样式标记行动计划、收集者和命运契约；不要把中文拼成普通 String 后烘焙到图片。"
        ],
        [
          "Force Layout Prepass / Get Desired Size",
          "先更新文本与换行约束，再测量。只在数据、语言、视口变化时安排布局刷新；不要在 Tick 中持续强制预计算。"
        ]
      ],
      "expect": "长文不叠字，语言切换正确，列表回收不带上页状态。",
      "fix": "预期尺寸为零时检查是否在文字更新前就读取；可安排一次延后布局刷新，不要每帧强制 Prepass。",
      "nodeKeys": [
        "list",
        "entry",
        "text",
        "layout"
      ],
      "blueprintFlow": [
        [
          "阶段 Objectives",
          "当前页数据对象"
        ],
        [
          "ListView 分配条目",
          "每次完整刷新"
        ],
        [
          "文字测量与换行",
          "行高和滚动随内容更新"
        ]
      ],
      "walk": {
        "caseId": "season-challenge-ui",
        "place": "RefreshStageConditions / WBP_ObjectiveEntry / String Table",
        "goal": "条目被复用时完整刷新，正文随内容增高。",
        "steps": [
          {
            "action": "查看条件 ListView 的 Entry Widget Class，进入 WBP_ObjectiveEntry，确认实现 User Object List Entry。",
            "see": "列表分配的是数据对象，不为所有历史任务永久创建一套控件。",
            "tip": "预期尺寸为零时检查是否在文字更新前就读取；可安排一次延后布局刷新，不要每帧强制 Prepass。"
          },
          {
            "action": "沿 On List Item Object Set 检查每次分配都重写文本、Current/Target、完成图标与状态；不要只在 Construct 初始化。",
            "see": "三条→单条→三条切换，不出现旧勾、旧文本或残留选中。",
            "tip": "预期尺寸为零时检查是否在文字更新前就读取；可安排一次延后布局刷新，不要每帧强制 Prepass。"
          },
          {
            "action": "打开 ST_SeasonChallenge、_en、_ja 与富文本样式表。条件标题使用 Bold 43px，任务 Medium 32px/48px；TaskAccent 区分三个任务关键词。",
            "see": "文字仍是可本地化 FText；图标与文字分别排版。",
            "tip": "预期尺寸为零时检查是否在文字更新前就读取；可安排一次延后布局刷新，不要每帧强制 Prepass。"
          },
          {
            "action": "正文 Auto Wrap，更新后按 Desired Size 安排行高；标题方形、连接线与任务状态图不重叠。目标指引保持在 515×72 基准框内居中。",
            "see": "长句自然换行，后续任务跟着下移；可视区域内三条完整可见。",
            "tip": "预期尺寸为零时检查是否在文字更新前就读取；可安排一次延后布局刷新，不要每帧强制 Prepass。"
          },
          {
            "action": "在练习数据里增加 +50% 长文、切换英文和日文，再插入足够多条目测试滚动；切页后回到顶部。",
            "see": "内容超出时才有可拖动范围，回收条目显示正确，字号不靠缩小来补救。",
            "tip": "预期尺寸为零时检查是否在文字更新前就读取；可安排一次延后布局刷新，不要每帧强制 Prepass。"
          }
        ],
        "key": "main-4"
      }
    },
    {
      "title": "三档布局与进度自动更新",
      "where": "DA_ExactLayout_* / DA_ActionPlanProgress / WBP_ActionPlanContent",
      "actions": [
        "打开 DA_ExactLayout_Standard / Tablet / Wide。按本次最终确认的 +5% 宽度，标准行动列 733、中列 783、奖励列 635；宽屏奖励列 1161。",
        "对照课程适配表查看平板高度：行动 1048、中列卡片各 691、奖励 1408。保持左中间距和中右视觉分组，不平均分配间距。",
        "调整卡片框时保留图片等比适配；需要铺满用等比填充并裁剪，需要完整展示用等比包含并允许留黑。不要分别拉伸图片 X/Y。",
        "在行动进度数据里改变 CurrentStars 与阶段阈值，通过已有刷新入口检查解锁状态；观察阶段数字、主线与星数两行。",
        "收集者与契约的 DA_CardDetails_* 负责完成数和底部状态。用一组新数据刷新后，再恢复演示值 1/2、0/7。"
      ],
      "wires": [
        [
          "Force Layout Prepass / Get Desired Size",
          "先更新文本与换行约束，再测量。只在数据、语言、视口变化时安排布局刷新；不要在 Tick 中持续强制预计算。"
        ],
        [
          "Format Text / SetText (Text)",
          "FText 格式化进度；TaskAccent 富文本样式标记行动计划、收集者和命运契约；不要把中文拼成普通 String 后烘焙到图片。"
        ]
      ],
      "expect": "三个参考窗口全部留在对应框内；改变进度只影响阶段和相关文字。",
      "fix": "课程中的尺寸是本工程最终标定值，不是最初草案；不要把 3100×1440 宽屏误记为 2560×1440。",
      "nodeKeys": [
        "layout",
        "text"
      ],
      "blueprintFlow": [
        [
          "视口比例",
          "选择集中布局档位"
        ],
        [
          "等比图片与裁剪",
          "保持美术形状"
        ],
        [
          "进度数据变化",
          "刷新阶段与状态文字"
        ]
      ],
      "walk": {
        "caseId": "season-challenge-ui",
        "place": "DA_ExactLayout_* / DA_ActionPlanProgress / WBP_ActionPlanContent",
        "goal": "固定左中列，右列吸收宽度，进度不由点击增加。",
        "steps": [
          {
            "action": "打开 DA_ExactLayout_Standard / Tablet / Wide。按本次最终确认的 +5% 宽度，标准行动列 733、中列 783、奖励列 635；宽屏奖励列 1161。",
            "see": "修改发生在集中参数里，不再为每个比例复制一套 WBP。",
            "tip": "课程中的尺寸是本工程最终标定值，不是最初草案；不要把 3100×1440 宽屏误记为 2560×1440。"
          },
          {
            "action": "对照课程适配表查看平板高度：行动 1048、中列卡片各 691、奖励 1408。保持左中间距和中右视觉分组，不平均分配间距。",
            "see": "平板卡片变高，右侧仍完整显示奖励与条件。",
            "tip": "课程中的尺寸是本工程最终标定值，不是最初草案；不要把 3100×1440 宽屏误记为 2560×1440。"
          },
          {
            "action": "调整卡片框时保留图片等比适配；需要铺满用等比填充并裁剪，需要完整展示用等比包含并允许留黑。不要分别拉伸图片 X/Y。",
            "see": "框大小改变，物体形状不变，超出内容留在裁剪区域内。",
            "tip": "课程中的尺寸是本工程最终标定值，不是最初草案；不要把 3100×1440 宽屏误记为 2560×1440。"
          },
          {
            "action": "在行动进度数据里改变 CurrentStars 与阶段阈值，通过已有刷新入口检查解锁状态；观察阶段数字、主线与星数两行。",
            "see": "只显示已解锁段的数字，锁定段显示锁；鼠标点击不发放进度。",
            "tip": "课程中的尺寸是本工程最终标定值，不是最初草案；不要把 3100×1440 宽屏误记为 2560×1440。"
          },
          {
            "action": "收集者与契约的 DA_CardDetails_* 负责完成数和底部状态。用一组新数据刷新后，再恢复演示值 1/2、0/7。",
            "see": "完成数、刷新时间与暂无接取契约都由文字控件显示，未烘焙到背景图。",
            "tip": "课程中的尺寸是本工程最终标定值，不是最初草案；不要把 3100×1440 宽屏误记为 2560×1440。"
          }
        ],
        "key": "main-5"
      }
    },
    {
      "title": "整理节点与注释，先证明行为没变",
      "where": "所有蓝图 Graph → Docs 清单与对比表",
      "actions": [
        "选一个小函数练习：先记录函数输入输出、状态写入、执行分支与外部调用；给完整流程加目的注释框，再给节点补关键用途。",
        "按执行关系从左到右安排；纯数据节点靠近消费者，不同事件分别分区。为长标题、引脚默认值与注释框留足空间。",
        "只删除已确认不参与输出的纯叶节点、断开的非事件节点；同一作用域的重复变量 Get 可在检查写入边界后合并。",
        "不要批量合并随机、时间、对象创建或函数调用。即使节点名称相同，重复求值时机与副作用也可能不同。",
        "逐个编译，重跑悬浮、分页、条件、进度与语言回归；将节点数量、注释、测试结果及未测项目写入 Docs。"
      ],
      "wires": [
        [
          "ApplyVisualState（工程覆盖函数）",
          "WBP_InteractiveBase 保存交互状态；导航子类应用绿色；任务卡只应用白边；状态优先级保留 Disabled 与 Pressed 分支。"
        ],
        [
          "CommitStage（工程函数）",
          "离场完成 → CommitStage → StageReward.ApplyStage + Screen.RefreshStageConditions → 入场；不要给两块区域各维护一个索引。"
        ]
      ],
      "expect": "没有节点覆盖，注释包含用途/输入输出/副作用，功能回归全部通过。",
      "fix": "本次自动排版用保守包围范围核验，仍应在编辑器中目视检查；不要把估算范围称为实际节点像素测量。",
      "nodeKeys": [
        "state",
        "commit"
      ],
      "blueprintFlow": [
        [
          "记录接口与行为",
          "保留可比较基线"
        ],
        [
          "保守精简与排版",
          "明确用途和副作用"
        ],
        [
          "编译与回归",
          "证明功能保持"
        ]
      ],
      "walk": {
        "caseId": "season-challenge-ui",
        "place": "所有蓝图 Graph → Docs 清单与对比表",
        "goal": "只做有依据的精简，保留接口与执行顺序。",
        "steps": [
          {
            "action": "选一个小函数练习：先记录函数输入输出、状态写入、执行分支与外部调用；给完整流程加目的注释框，再给节点补关键用途。",
            "see": "读者能知道本函数做什么、由谁调用、修改哪些状态。",
            "tip": "本次自动排版用保守包围范围核验，仍应在编辑器中目视检查；不要把估算范围称为实际节点像素测量。"
          },
          {
            "action": "按执行关系从左到右安排；纯数据节点靠近消费者，不同事件分别分区。为长标题、引脚默认值与注释框留足空间。",
            "see": "节点、文字与连线有清楚间距，保存后重新打开布局不丢失。",
            "tip": "本次自动排版用保守包围范围核验，仍应在编辑器中目视检查；不要把估算范围称为实际节点像素测量。"
          },
          {
            "action": "只删除已确认不参与输出的纯叶节点、断开的非事件节点；同一作用域的重复变量 Get 可在检查写入边界后合并。",
            "see": "本项目 3844→3496，减少 348；公开函数签名、变量默认值与动画绑定保持。",
            "tip": "本次自动排版用保守包围范围核验，仍应在编辑器中目视检查；不要把估算范围称为实际节点像素测量。"
          },
          {
            "action": "不要批量合并随机、时间、对象创建或函数调用。即使节点名称相同，重复求值时机与副作用也可能不同。",
            "see": "所有精简都有前后执行连接与数据表达式对照，无法证明等价就保留。",
            "tip": "本次自动排版用保守包围范围核验，仍应在编辑器中目视检查；不要把估算范围称为实际节点像素测量。"
          },
          {
            "action": "逐个编译，重跑悬浮、分页、条件、进度与语言回归；将节点数量、注释、测试结果及未测项目写入 Docs。",
            "see": "42 个蓝图全部通过编译；节点减少仅代表结构精简，不宣称帧率提高 9%。",
            "tip": "本次自动排版用保守包围范围核验，仍应在编辑器中目视检查；不要把估算范围称为实际节点像素测量。"
          }
        ],
        "key": "main-6"
      }
    },
    {
      "title": "整理为可评审的工程交付",
      "where": "README / Docs / Config / Content / SHA256SUMS",
      "actions": [
        "仅打包 uproject、Config、Content、Docs 与必要资源；排除 Saved、Intermediate、缓存、测试夹具、作者工具脚本和日志。",
        "字体使用已内嵌的 Font Face；图片重导入源作为可选下载，解压到工程根目录。验证运行不依赖作者机器的绝对路径。",
        "完整解压一个新副本，从默认地图 Play，并测试三张卡片和完整分页；重新 Cook 后记录成功、错误及警告。",
        "阅读 Docs/参数与结构.md 与验证摘要，核对 SHA256SUMS。把引擎版本与演示数据范围写清楚。",
        "在下方运行自测中记录你自己的结果。网站勾选只保存当前浏览器的学习记录，不会自动连接 UE 或替你验收。"
      ],
      "wires": [
        [
          "CommitStage（工程函数）",
          "离场完成 → CommitStage → StageReward.ApplyStage + Screen.RefreshStageConditions → 入场；不要给两块区域各维护一个索引。"
        ]
      ],
      "expect": "新目录能打开并运行，README、参数入口和验证范围齐全。",
      "fix": "Cook 成功不等于已生成 Windows 可执行文件；本页提供工程源码，不把静态截图当成录屏。",
      "nodeKeys": [
        "commit"
      ],
      "blueprintFlow": [
        [
          "干净工程副本",
          "保留运行所需资产"
        ],
        [
          "独立启动与 Cook",
          "明确验证结果"
        ],
        [
          "清单与校验文件",
          "让评审可复现"
        ]
      ],
      "walk": {
        "caseId": "season-challenge-ui",
        "place": "README / Docs / Config / Content / SHA256SUMS",
        "goal": "让另一台电脑能打开、运行并找到修改入口。",
        "steps": [
          {
            "action": "仅打包 uproject、Config、Content、Docs 与必要资源；排除 Saved、Intermediate、缓存、测试夹具、作者工具脚本和日志。",
            "see": "下载包结构干净，打开后本地重新生成缓存。",
            "tip": "Cook 成功不等于已生成 Windows 可执行文件；本页提供工程源码，不把静态截图当成录屏。"
          },
          {
            "action": "字体使用已内嵌的 Font Face；图片重导入源作为可选下载，解压到工程根目录。验证运行不依赖作者机器的绝对路径。",
            "see": "无需安装 ProjectD 或作者本地字体，仍能显示中英日文案。",
            "tip": "Cook 成功不等于已生成 Windows 可执行文件；本页提供工程源码，不把静态截图当成录屏。"
          },
          {
            "action": "完整解压一个新副本，从默认地图 Play，并测试三张卡片和完整分页；重新 Cook 后记录成功、错误及警告。",
            "see": "交付副本可运行；本次 Cook 为 627 包、0 错误、1 条证书存储警告。",
            "tip": "Cook 成功不等于已生成 Windows 可执行文件；本页提供工程源码，不把静态截图当成录屏。"
          },
          {
            "action": "阅读 Docs/参数与结构.md 与验证摘要，核对 SHA256SUMS。把引擎版本与演示数据范围写清楚。",
            "see": "评审者能快速定位控件、样式、阶段条件和本次验证边界。",
            "tip": "Cook 成功不等于已生成 Windows 可执行文件；本页提供工程源码，不把静态截图当成录屏。"
          },
          {
            "action": "在下方运行自测中记录你自己的结果。网站勾选只保存当前浏览器的学习记录，不会自动连接 UE 或替你验收。",
            "see": "刷新页面后勾选与笔记保留；可从我的训练导出学习备份。",
            "tip": "Cook 成功不等于已生成 Windows 可执行文件；本页提供工程源码，不把静态截图当成录屏。"
          }
        ],
        "key": "main-7"
      }
    }
  ],
  "nodeSpecs": {
    "hover": {
      "en": "On Mouse Enter / On Mouse Leave",
      "role": "在指针跨入、跨出卡片时更新悬浮状态。",
      "input": "My Geometry、Mouse Event（进入）；Mouse Event（离开）。",
      "output": "执行出口。",
      "wire": "WBP_TaskCard 的公共 HandleHoverEnter / HandleHoverLeave 进入交互基类；只在 bHovered 改变时启动或反向播放动画。"
    },
    "geometry": {
      "en": "On Mouse Move / Is Under Location",
      "role": "用当前控件几何检查指针是否位于卡片内。",
      "input": "My Geometry；Mouse Event 的 Screen Space Position。",
      "output": "Is Under Location 返回 Boolean；On Mouse Move 返回 Event Reply。",
      "wire": "Geometry 与屏幕坐标接 Is Under Location；与旧 bHovered 比较，不相同才进入悬浮或离开路径；不能每次移动都重播动画。"
    },
    "animation": {
      "en": "Play Animation / Reverse Animation",
      "role": "播放已有 UMG 动画，背景缩放不依赖 Tick 插值。",
      "input": "Target=当前 UserWidget；In Animation=该控件的悬浮动画。",
      "output": "执行出口；Play Animation 返回播放器。",
      "wire": "WBP_TaskCard.GetHoverAnimation 提供动画；时间轴只绑定 IMG_Artwork 的 Render Transform.Scale，0 秒=1、0.18 秒=1.2。"
    },
    "clip": {
      "en": "Set Clipping / Set Render Scale",
      "role": "把放大的图片裁剪在框内，并保持等比。",
      "input": "Clipping=Clip to Bounds；Scale 为 Vector2D，同值 X/Y。",
      "output": "执行出口。",
      "wire": "先在任务卡根与图片区域检查裁剪；只改 IMG_Artwork，CP_Root、TXT_Label 与边线 Scale 保持 (1,1)。"
    },
    "delta": {
      "en": "RequestStageDelta（工程函数）",
      "role": "主页面接收上一页或下一页请求。",
      "input": "Delta：Integer，左=-1，右=1。",
      "output": "无返回；可能进入切换。",
      "wire": "箭头控件通知 OwnerScreen；WBP_SeasonChallengeScreen.RequestStageDelta 先核验数据、边界与 bTransitioning，再开始离场。"
    },
    "commit": {
      "en": "CommitStage（工程函数）",
      "role": "提交合法索引，统一更新奖励和达成条件。",
      "input": "读取本次待提交索引与阶段数组。",
      "output": "无返回；更新当前显示。",
      "wire": "离场完成 → CommitStage → StageReward.ApplyStage + Screen.RefreshStageConditions → 入场；不要给两块区域各维护一个索引。"
    },
    "clamp": {
      "en": "Clamp (Integer) / Is Valid Index",
      "role": "保护阶段索引和空数据边界。",
      "input": "Value；Min=0；Max=Length−1；数组与 Index。",
      "output": "Integer / Boolean。",
      "wire": "先 Length>0，再 Clamp；访问数组前 Is Valid Index。空数组的 Length−1=-1，不能当作有效索引继续 Get。"
    },
    "list": {
      "en": "Set List Items",
      "role": "把当前阶段的条目对象交给虚拟化 ListView。",
      "input": "Target=条件 ListView；In List Items=当前阶段目标对象数组。",
      "output": "执行出口。",
      "wire": "RefreshStageConditions 重建当前页的条目数据并重置选择、滚动位置；内容不足一屏时不强制造出可拖动范围。"
    },
    "entry": {
      "en": "On List Item Object Set",
      "role": "虚拟化条目每次分配数据时重写完整外观。",
      "input": "List Item Object：Object。",
      "output": "执行出口。",
      "wire": "WBP_ObjectiveEntry 实现 User Object List Entry；验证并读取条目对象，重写富文本、完成数、状态图、选中与禁用表现。"
    },
    "text": {
      "en": "Format Text / SetText (Text)",
      "role": "让数字与本地化句式组合，并更新文本控件。",
      "input": "来自 String Table 的 Text Pattern；命名数字参数；目标 TextBlock / RichTextBlock。",
      "output": "格式化后的 Text / 执行出口。",
      "wire": "FText 格式化进度；TaskAccent 富文本样式标记行动计划、收集者和命运契约；不要把中文拼成普通 String 后烘焙到图片。"
    },
    "layout": {
      "en": "Force Layout Prepass / Get Desired Size",
      "role": "文字更新后取得期望尺寸，驱动行高与后续位置。",
      "input": "Target=要预计算布局的 Widget。",
      "output": "Desired Size：Vector2D。",
      "wire": "先更新文本与换行约束，再测量。只在数据、语言、视口变化时安排布局刷新；不要在 Tick 中持续强制预计算。"
    },
    "state": {
      "en": "ApplyVisualState（工程覆盖函数）",
      "role": "共享输入状态，各组件分别决定最终颜色与边框。",
      "input": "读取 bHovered / bPressed / bSelected / 是否可交互。",
      "output": "无返回；更新当前外观。",
      "wire": "WBP_InteractiveBase 保存交互状态；导航子类应用绿色；任务卡只应用白边；状态优先级保留 Disabled 与 Pressed 分支。"
    }
  },
  "tests": [
    "标准 2560×1440、平板 2560×1792、宽屏 3100×1440 均完整显示",
    "三张卡片仅背景悬浮到 1.2，文字与框不缩放且图片不出框",
    "框内移动不反复重播动画，离开恢复原比例",
    "导航点击绿色底板与上下线，任务卡点击四周白边",
    "箭头按 0→1→2 和 2→1→0 正确翻页，首尾不循环",
    "首尾箭头隐藏保留槽位，快速连点不越界",
    "第二奖励只有最终任务条件，第三奖励显示赛季目标二与三条条件",
    "条件单条/三条互切不残留上页文字或图标，滚动位置复位",
    "英文、日文、+50% 长文换行后没有行间重叠",
    "行动阶段按进度自动更新，锁定段显示锁，点击不增加进度",
    "重构后全部编译，公开接口、默认值与动画绑定保持",
    "全新解压目录能够打开运行，并能按 README 找到参数修改入口"
  ],
  "verification": {
    "project": "SeasonChallenge_UI_UE584",
    "engine": "5.8.4",
    "verifiedAt": "2026-11-07",
    "blueprints": 42,
    "widgetBlueprints": 19,
    "nodesBefore": 3844,
    "nodesAfter": 3496,
    "commentBoxes": 639,
    "staticChecks": {
      "checks": 2042,
      "passed": 2042
    },
    "maxContainerDepth": 3,
    "expandedWidgets": 266,
    "runtimeSuites": {
      "feedback": {
        "Standard": {
          "checks": 531,
          "passed": 531
        },
        "Tablet": {
          "checks": 531,
          "passed": 531
        },
        "Wide": {
          "checks": 531,
          "passed": 531
        }
      },
      "paging": {
        "Standard": {
          "checks": 945,
          "passed": 945
        },
        "Tablet": {
          "checks": 945,
          "passed": 945
        },
        "Wide": {
          "checks": 945,
          "passed": 945
        }
      },
      "action": {
        "Standard": {
          "checks": 1183,
          "passed": 1183
        },
        "Tablet": {
          "checks": 1183,
          "passed": 1183
        },
        "Wide": {
          "checks": 1183,
          "passed": 1183
        }
      }
    },
    "deliveryFeedback": {
      "checks": 531,
      "passed": 531
    },
    "cook": {
      "platform": "Windows",
      "packages": 627,
      "remaining": 0,
      "errors": 0,
      "warnings": 1,
      "warning": "LogSsl: Unable to open ROOT certificate store"
    },
    "limits": [
      "节点布局采用保守包围范围检查，未执行编辑器全图逐页人工目视验收。",
      "独立运行验证使用真实 Slate 几何、蓝图事件与原生按钮委托，未验证物理鼠标注入。",
      "未提供 Draw Call 或帧耗时实测；节点减少不代表同比帧率提升。",
      "Cook 已通过；此包是需 UE 编辑器运行的工程源码，不是打包可执行文件。"
    ]
  },
  "download": {
    "file": "SeasonChallenge_UI_UE584.zip",
    "bytes": 19640190,
    "sha256": "c138bc67640f7bbe719d6dabee0cd52578fac1c830455d374ab2541ae01499c1",
    "entries": 142,
    "engine": "5.8.4",
    "sourceArt": {
      "file": "SeasonChallenge_SourceArt.zip",
      "bytes": 5729151,
      "sha256": "72e981bff6d0a804b6748a59bb0e5f1c41bc04f3a5283d7bcbe669e7a64a3d39"
    }
  },
  "sources": [
    [
      "UMG 官方实践",
      "https://dev.epicgames.com/documentation/unreal-engine/umg-best-practices-in-unreal-engine?lang=en-US"
    ],
    [
      "DPI Scaling 配置",
      "https://dev.epicgames.com/documentation/en-us/unreal-engine/dpi-scaling-in-unreal-engine"
    ],
    [
      "Font DPI 与 Figma 标定",
      "https://dev.epicgames.com/documentation/unreal-engine/font-dpi-scaling-in-unreal-engine"
    ],
    [
      "虚拟化列表 UListView",
      "https://dev.epicgames.com/documentation/unreal-engine/API/Runtime/UMG/UListView"
    ]
  ]
};
window.BLUEPRINT_GRAPH_MODELS={"season-challenge-ui":{nodes:[{id:"request",label:"RequestStageDelta",type:"输入入口",detail:"箭头传 -1 或 +1；先验证 Owner、数据、首尾与切换中状态。",x:20,y:20},{id:"leave",label:"离场动画",type:"UMG 动画",detail:"旧内容淡出并位移，切换期间防重入；动画完成后提交合法索引。",x:330,y:20},{id:"commit",label:"CommitStage",type:"统一提交",detail:"一个当前索引驱动奖励、标题、说明、分页与条件，避免分别维护。",x:640,y:20},{id:"reward",label:"ApplyStage",type:"奖励刷新",detail:"刷新奖励数据、分页点与首尾箭头，隐藏按钮保留槽位。",x:330,y:230},{id:"conditions",label:"RefreshStageConditions",type:"条件刷新",detail:"当前阶段 Objectives 交给 ListView，重置选择与滚动，再入场。",x:640,y:230}],edges:[{from:"request",to:"leave",kind:"exec",label:"合法请求"},{from:"leave",to:"commit",kind:"exec",label:"离场完成"},{from:"commit",to:"reward",kind:"exec",label:"同一索引"},{from:"reward",to:"conditions",kind:"exec",label:"一并刷新"}]}};
