/* Blueprint Lab: local, independently hosted lesson content. */
window.BLUEPRINT_COURSES = [
  {
    id: 'first-blueprint', module: '入门基础', level: '零基础', minutes: 15,
    title: '创建你的第一张蓝图', description: '从零认识事件图表，制作一个运行时输出文字的 Actor。',
    badge: '建议第一课', outcome: '运行游戏时，屏幕能显示“Hello Blueprint!”。',
    premise: '安装 UE5；创建一个 Games > Blank 蓝图项目。',
    concept: '蓝图是一套可以连接的可视化编程节点。事件决定“什么时候发生”，执行引脚决定“先做什么、后做什么”，数据引脚负责传递数值。',
    flow: ['Event BeginPlay', 'Print String', '屏幕显示文字'],
    nodes: [
      {label:'Event BeginPlay', type:'事件', desc:'游戏开始时执行一次'},
      {label:'Print String', type:'函数', desc:'In String = Hello Blueprint!'},
      {label:'屏幕输出', type:'结果', desc:'显示调试文字'}
    ],
    steps: [
      {title:'创建 Actor 蓝图', body:'打开内容浏览器，在 Content 文件夹空白处右键，选择“蓝图类 / Blueprint Class”→“Actor”。将它命名为 BP_Hello。', help:'Actor 可以理解为“能放进关卡里的物体”。这一步还没有写任何逻辑。'},
      {title:'找到事件图表', body:'双击 BP_Hello，进入 Event Graph（事件图表）。找到红色的 Event BeginPlay 节点。如果没有，右键搜索 Event BeginPlay。', help:'BeginPlay 只会在这个 Actor 进入游戏时触发一次。'},
      {title:'连接输出节点', body:'从 BeginPlay 的白色执行引脚拖一条线，在搜索框输入 Print String 并选中。将 In String 改成 Hello Blueprint!。', help:'一定要连接白色的执行线，否则节点不会运行。'},
      {title:'放置并运行', body:'点击“编译 / Compile”和“保存 / Save”，把 BP_Hello 从内容浏览器拖到关卡场景，按 Play 运行。', help:'蓝图只保存在资源里还不够，必须把这个 Actor 放入关卡才会触发。'}
    ],
    params:[['In String','Hello Blueprint!','需要显示的内容'],['Duration','2.0','文字停留时间（秒）']],
    pitfalls:[['运行时什么也没出现','检查 BP_Hello 是否已放进关卡，以及 BeginPlay 是否连接 Print String。'],['节点搜索不到','确认在 Event Graph 空白处右键搜索，而不是在变量面板里搜索。']],
    check:'在 Play 模式运行关卡，出现 Hello Blueprint! 即通过。'
  },
  {
    id: 'character-move', module: '人物系统', level: '初级', minutes: 30,
    title: '理解角色的移动输入', description:'从第三人称模板入手，弄懂按键、方向与角色移动之间的关系。',
    badge:'人物系统 01', outcome:'理解 WASD 如何触发 Add Movement Input，并能修改移动速度。',
    premise:'使用 UE5 Games > Third Person 模板，并选择 Blueprint 项目。',
    concept:'增强输入（Enhanced Input）将“按下什么键”和“执行什么动作”分离。IA_Move 表示移动意图，角色蓝图读取二维输入值，再将它转换成世界空间的移动方向。',
    flow:['IA_Move 触发','读取二维方向','计算前/右方向','Add Movement Input'],
    nodes:[
      {label:'IA_Move', type:'输入动作', desc:'输出 Vector2D'},
      {label:'Get Control Rotation', type:'函数', desc:'只使用 Yaw 朝向'},
      {label:'Get Forward / Right Vector', type:'函数', desc:'构造世界方向'},
      {label:'Add Movement Input', type:'函数', desc:'移动角色'}
    ],
    steps:[
      {title:'创建第三人称示例',body:'新建项目时选择 Games → Third Person → Blueprint。进入关卡后直接 Play，尝试 WASD 和鼠标，先确认模板可以正常移动。',help:'使用模板能避免一上来就配置大量角色和输入资产。'},
      {title:'打开角色事件图',body:'在内容浏览器找到第三人称角色蓝图（不同 UE5 版本名称或目录可能不同，常见为 BP_ThirdPersonCharacter），打开 Event Graph，并搜索 IA_Move 事件。',help:'IA 是 Input Action（输入动作），不是“移动函数”本身。'},
      {title:'观察方向转换',body:'顺着 IA_Move 的输出连线查看 Move 逻辑：输入的 X/Y 方向通过控制器朝向转为 Forward/Right Vector，再传给 Add Movement Input。不要先删除模板节点。',help:'前进方向通常以摄像机/控制器的水平朝向为参考。'},
      {title:'修改移动速度',body:'在角色蓝图的 Components 选择 CharacterMovement，在 Details 中搜索 Max Walk Speed。将默认值改为 300（单位 cm/s），编译并运行，对比移动速度。',help:'这里修改的是 Movement 组件的速度上限，不是输入动作。'}
    ],
    params:[['IA_Move','Axis2D','移动操作的二维输入值'],['Max Walk Speed','300','角色最大步行速度，单位 cm/s'],['控制器旋转','Yaw','用于计算水平方向']],
    pitfalls:[['按键没有反应','确认模板中的 Input Mapping Context 已添加，且正在控制正确的 Pawn。'],['前进方向不对','检查有没有把 Pitch/Roll 混入水平移动方向计算。']],
    check:'能说清 IA_Move、Get Forward Vector 和 Add Movement Input 各自负责什么，并成功修改移动速度。'
  },
  {
    id:'camera-follow', module:'人物系统', level:'初级', minutes:25,
    title:'让第三人称摄像机跟随角色', description:'认识 Spring Arm、Follow Camera，并亲手调整镜头距离与转向。',
    badge:'人物系统 02', outcome:'镜头始终跟随角色；可用鼠标转向，并能调整跟随距离。',
    premise:'完成第三人称模板移动练习，使用 Blueprint 模板。',
    concept:'Spring Arm（弹簧臂）负责摄像机与角色的距离、碰撞缩短；Camera 负责画面。控制器旋转传给弹簧臂，角色移动方向可以独立于镜头方向。',
    flow:['鼠标 Look 输入','控制器旋转','Spring Arm 跟随','Follow Camera 出画面'],
    nodes:[
      {label:'IA_Look',type:'输入动作',desc:'鼠标输出二维视角偏移'},
      {label:'Add Controller Yaw/Pitch Input',type:'函数',desc:'更新控制器朝向'},
      {label:'CameraBoom (SpringArm)',type:'组件',desc:'使用控制器旋转'},
      {label:'FollowCamera',type:'组件',desc:'输出第三人称视角'}
    ],
    steps:[
      {title:'找到摄像机组件',body:'打开 BP_ThirdPersonCharacter，在左侧 Components 找到 CameraBoom（Spring Arm）与其下的 FollowCamera。点击组件名称，观察右侧 Details 面板。',help:'CameraBoom 是弹簧臂的常见模板名称；版本不同可能叫 SpringArm。'},
      {title:'修改跟随距离',body:'选中 CameraBoom，在 Details 中搜索 Target Arm Length。记录原值，再改为 350。点击 Compile、Save，在关卡中 Play，观察人物与镜头之间的距离。',help:'单位是厘米。数值越大，镜头通常离角色越远；有墙时弹簧臂可能自动缩短。'},
      {title:'检查谁负责旋转',body:'在 CameraBoom 上确认 Use Pawn Control Rotation 已开启；选中 FollowCamera，确认该选项没有开启。使用默认第三人称模板已有的 IA_Look 输入逻辑。',help:'镜头方向主要由控制器传给弹簧臂，不要让摄像机重复使用控制器旋转。'},
      {title:'测试角色与镜头的区别',body:'按 Play，用鼠标旋转镜头，再按 W/A/S/D 移动。观察摄像机朝向变化与角色移动方向；之后把 Target Arm Length 设为 250，再测试一次。',help:'如果只希望角色朝移动方向转，通常让 CharacterMovement 的 Orient Rotation to Movement 开启，角色 Use Controller Rotation Yaw 关闭。'}
    ],
    params:[['Target Arm Length','350 cm','镜头与角色的目标距离'],['Use Pawn Control Rotation','SpringArm: true','让弹簧臂跟随控制器朝向'],['Do Collision Test','true（通常默认）','防止摄像机穿墙']],
    pitfalls:[['摄像机不转','检查 IA_Look / Input Mapping Context 及 SpringArm 的 Use Pawn Control Rotation。'],['镜头靠墙突然变近','这是弹簧臂碰撞缩短的效果，检查 Probe Size 和 Do Collision Test。'],['角色移动方向异常','检查角色旋转选项和 Movement 组件的方向设置是否冲突。']],
    check:'修改 Target Arm Length 后镜头距离明显变化，鼠标旋转时摄像机方向能正常改变。'
  },
  {
    id:'character-jump', module:'人物系统', level:'初级', minutes:25,
    title:'添加跳跃输入与落地判断', description:'用 IA_Jump 连接 Jump / Stop Jumping，理解起跳和落地的区别。',
    badge:'人物系统 03', outcome:'按下空格跳起，松开停止持续跳跃输入，落地后能再次跳跃。',
    premise:'第三人称角色可以正常控制；项目已启用 Enhanced Input。',
    concept:'输入事件不是“跳跃物理”。IA_Jump 负责发现空格按键，Jump 由 Character 完成实际跳跃；CharacterMovement 负责落地与空中状态。',
    flow:['IA_Jump Started','Character.Jump','Movement → Falling','落地 → Walking'],
    nodes:[
      {label:'IA_Jump Started',type:'事件',desc:'开始按住空格'},
      {label:'Jump',type:'角色函数',desc:'向 Character 请求跳跃'},
      {label:'IA_Jump Completed / Canceled',type:'事件',desc:'输入停止'},
      {label:'Stop Jumping',type:'角色函数',desc:'结束按键保持'}
    ],
    steps:[
      {title:'找到跳跃输入动作',body:'打开第三人称角色的 Event Graph，搜索 IA_Jump。模板往往已创建该事件；如果没有，新建 Input Action（Boolean），在正在使用的 Input Mapping Context 中绑定 Space Bar。',help:'先利用已有模板逻辑，避免重复创建两个 IA_Jump 导致输入冲突。'},
      {title:'连接开始跳跃',body:'从 IA_Jump 事件的 Started 白色执行引脚连接 Jump 节点。Jump 的 Target 默认为 Self（当前角色）。',help:'如果节点搜索不到，确认当前蓝图继承自 Character，而不是普通 Actor。'},
      {title:'连接结束跳跃',body:'将 IA_Jump 的 Completed 和 Canceled 分别连接 Stop Jumping（可用两个相同的 Stop Jumping 节点）。编译保存。',help:'Completed 是动作正常结束；Canceled 是输入被中断。两者都要考虑。'},
      {title:'观察空中状态',body:'Play 后按空格起跳、松开并落地。可暂时添加打印：使用 CharacterMovement → Is Falling 判断角色是否悬空，测试后可删掉调试节点。',help:'简单跳跃先不处理二段跳和体力值，避免同时叠加太多逻辑。'}
    ],
    params:[['IA_Jump Value Type','Boolean','跳跃输入开/关'],['Jump Z Velocity','默认值即可','CharacterMovement 中的跳跃初速度'],['Air Control','默认值即可','角色空中转向能力']],
    pitfalls:[['按空格没有反应','检查角色是否被玩家控制、Input Mapping Context 是否生效，及是否连接 Jump。'],['Jump 节点找不到','确认角色父类是 Character；普通 Pawn/Actor 没有相同的现成跳跃实现。'],['无法再次跳跃','观察是否落地，以及 Jump 的按键结束逻辑是否正确。']],
    check:'空格能控制跳跃，落地之后再次按空格可以重复起跳。'
  },
  {
    id:'character-sprint', module:'人物系统', level:'初级', minutes:35,
    title:'制作按住 Shift 奔跑系统', description:'第一次做完整的角色状态：普通移动、按住奔跑、松开恢复。',
    badge:'人物系统 04', outcome:'角色默认速度为 300；按住 Shift 变成 600；松开 Shift 恢复 300。',
    premise:'完成角色移动与跳跃课程，并能编辑 BP_ThirdPersonCharacter。',
    concept:'奔跑不是“让前进输入更大”，而是角色状态改变了移动组件的速度上限。先确定普通速度和奔跑速度，输入事件只负责切换。',
    flow:['IA_Sprint Started','Max Walk Speed = 600','IA_Sprint Completed / Canceled','Max Walk Speed = 300'],
    nodes:[
      {label:'IA_Sprint',type:'输入动作',desc:'Shift / Boolean'},
      {label:'Get CharacterMovement',type:'组件',desc:'获取移动组件引用'},
      {label:'Set Max Walk Speed',type:'函数',desc:'按下设 600'},
      {label:'Set Max Walk Speed',type:'函数',desc:'松开恢复 300'}
    ],
    steps:[
      {title:'设置两个速度变量',body:'在角色 My Blueprint 中创建 WalkSpeed 与 SprintSpeed 两个 Float 变量，默认值分别填 300 和 600，编译保存。',help:'把数值放到变量里，比在很多节点上直接写 300 / 600 更容易统一调整。'},
      {title:'在 BeginPlay 初始化步行速度',body:'从 Event BeginPlay 的执行流程获取 CharacterMovement 组件，调用 Set Max Walk Speed，数值接 WalkSpeed。不要破坏模板原本的输入初始化逻辑；必要时使用 Sequence 分开执行。',help:'明确设置初始速度，后续测试才可以比较。'},
      {title:'新建奔跑输入',body:'新建 IA_Sprint（Value Type = Boolean）。打开模板使用的 IMC，把 Left Shift 映射到 IA_Sprint。',help:'只有创建 IA 没用，还需要映射到键盘按键。'},
      {title:'按住 Shift 切换速度',body:'在角色 Event Graph 添加 IA_Sprint 事件。Started 执行 Set Max Walk Speed = SprintSpeed；Completed 与 Canceled 执行 Set Max Walk Speed = WalkSpeed。',help:'不要用 Triggered 每帧重复修改速度，Started / Completed / Canceled 已足够。'},
      {title:'验证异常与恢复',body:'Play 后按 W 移动，按住 Shift 观察速度变化，松开应恢复。站立不动时按 Shift 也可以切换速度上限，但没有移动就不会直接产生位移。',help:'本课不做体力、动画和网络同步；先保证最小规则闭环。'}
    ],
    params:[['WalkSpeed','300 cm/s','普通移动速度上限'],['SprintSpeed','600 cm/s','奔跑移动速度上限'],['IA_Sprint','Boolean / Left Shift','切换速度的输入']],
    pitfalls:[['按住 Shift 没变化','确认 IA_Sprint 已添加到 IMC，且修改的是 CharacterMovement 的 Max Walk Speed。'],['松开 Shift 仍在奔跑','除了 Completed，建议把 Canceled 也连接到恢复速度逻辑。'],['角色速度一开始就太快','检查 BeginPlay 是否按预期初始化 WalkSpeed。']],
    check:'按住 Shift 移动明显更快，松开立即恢复普通速度；重复 3 次都正常。'
  },
  {
    id:'health-variables', module:'人物系统', level:'初级', minutes:30,
    title:'为角色添加生命值',description:'学习变量、伤害事件和 Clamp，完成最基础的血量规则。',
    badge:'人物系统 05',outcome:'角色受到伤害时血量降低，但不会变成负数。',
    premise:'已创建一个 Character 蓝图，并能运行游戏。',
    concept:'变量存储状态；伤害事件修改状态；Clamp 限制结果的合法范围。这就是最小的“数值系统”。',
    flow:['Event AnyDamage','当前生命 - Damage','Clamp (0 ~ 最大生命)','保存当前生命'],
    nodes:[
      {label:'Event AnyDamage',type:'事件',desc:'收到 Apply Damage'},
      {label:'Float - Float',type:'运算',desc:'CurrentHealth - Damage'},
      {label:'Clamp (Float)',type:'函数',desc:'范围 0 到 MaxHealth'},
      {label:'Set CurrentHealth',type:'变量写入',desc:'更新角色状态'}
    ],
    steps:[
      {title:'添加两个 Float 变量',body:'打开角色蓝图，在 My Blueprint 面板分别添加 MaxHealth 和 CurrentHealth，类型均为 Float。将默认值都设置为 100，编译保存。',help:'MaxHealth 是最大值，CurrentHealth 是随战斗变化的当前值。'},
      {title:'加入受伤事件',body:'在角色 Event Graph 右键搜索 Event AnyDamage。这个事件可以接收其他蓝图通过 Apply Damage 发送的伤害值 Damage。',help:'事件不会自动触发，必须由某个对象调用 Apply Damage。'},
      {title:'计算并限制新血量',body:'从 CurrentHealth 取 Get，减去 Damage；将结果连接 Clamp (Float)，Min 设 0，Max 使用 MaxHealth；最后连接 Set CurrentHealth。',help:'例如 20 HP 遭受 30 伤害，Clamp 后得到 0，而不是 -10。'},
      {title:'做一个可复现的测试',body:'在另一个测试 Actor 的 Box BeginOverlap 中调用 Apply Damage，Damaged Actor 连接玩家角色，Base Damage 设为 25。把测试 Actor 放到关卡，运行并观察血量变化（可暂时接 Print String）。',help:'同一碰撞可能触发多次；正式项目需要冷却或触发锁，防止重复扣血。'}
    ],
    params:[['MaxHealth','100','生命上限'],['CurrentHealth','100','当前生命'],['Damage','25','演示伤害数值'],['Clamp 范围','0 ~ MaxHealth','防止溢出']],
    pitfalls:[['血量没变化','检查 Apply Damage 传入的目标是不是当前玩家角色。'],['血量变负数','确认 Clamp 位于计算后、写入变量前。']],
    check:'接受一次 25 点伤害后当前血量由 100 变成 75，连续扣血也不会低于 0。'
  },
  {
    id:'door-interaction', module:'交互系统', level:'初级', minutes:40,
    title:'制作一个 E 键开门交互',description:'使用角色输入和碰撞检测，完成“靠近—按 E—开门”的基础流程。',
    badge:'交互系统 01', outcome:'人物靠近门后按 E，门绕 Z 轴旋转打开。',
    premise:'已完成角色移动课程；项目使用 Enhanced Input。',
    concept:'把输入放在角色蓝图，把门的开关逻辑放在门蓝图。角色只负责告诉门“打开”，门自己负责改变旋转。这样更容易维护。',
    flow:['进入碰撞区域','NearbyDoor = 此门','按下 IA_Interact','调用 OpenDoor'],
    nodes:[
      {label:'Box BeginOverlap', type:'事件', desc:'记录附近的门'},
      {label:'IA_Interact (E)',type:'输入动作',desc:'玩家按 E'},
      {label:'Is Valid (NearbyDoor)',type:'判断',desc:'是否靠近有效门'},
      {label:'OpenDoor',type:'自定义事件',desc:'旋转门物体'}
    ],
    steps:[
      {title:'创建门物体',body:'创建 Actor 蓝图 BP_Door，添加 Static Mesh 组件 DoorMesh（给它指定一个门的模型或立方体）和 Box Collision 组件。调整 Box 范围，让角色靠近门时进入碰撞盒。',help:'门轴位置会影响旋转效果；初学阶段先用可旋转的 Mesh 验证逻辑。'},
      {title:'创建交互输入',body:'创建 Input Action，命名 IA_Interact，Value Type 设为 Boolean。打开项目正在使用的 Input Mapping Context，把 E 键映射到 IA_Interact。',help:'新版 UE5 推荐使用 Enhanced Input；请先确认角色的 Mapping Context 已添加。'},
      {title:'记录附近的门',body:'在角色蓝图新建变量 NearbyDoor，类型选 BP_Door Object Reference。门蓝图的 Box BeginOverlap 触发时，判断 Other Actor 是当前角色，成功后将角色 NearbyDoor 设为 Self。EndOverlap 时，如果仍指向这个门，就清空它。',help:'NearbyDoor 相当于“角色当前可以交互的门”。'},
      {title:'按 E 调用开门事件',body:'在角色 Event Graph 找到 IA_Interact 的 Started 引脚，连接 Is Valid(NearbyDoor)，有效则调用 NearbyDoor 上的 OpenDoor 自定义事件。',help:'先判断 Is Valid，可避免不靠近门时访问空引用。'},
      {title:'实现打开效果并测试',body:'在 BP_Door 创建 OpenDoor 自定义事件。初版直接对 DoorMesh 使用 Set Relative Rotation，把 Z（Yaw）设置为 90°。编译后把 BP_Door 拖入关卡：靠近按 E 开门；走远按 E 不应触发。',help:'这是瞬间开门的基础版；之后可用 Timeline + Lerp Rotator 改成平滑动画。'}
    ],
    params:[['IA_Interact','Boolean / E','交互输入动作'],['NearbyDoor','BP_Door 引用','玩家附近的有效交互对象'],['Yaw','90°','演示用开门旋转角']],
    pitfalls:[['靠近了也不能开门','确认 Box Collision 允许 Overlap，并且 BeginOverlap 收到了角色。'],['按 E 无反应','检查 IA_Interact 是否映射到 E，以及 IMC 是否加入 Local Player。'],['门围绕奇怪的位置旋转','调整 Mesh 枢轴或创建门轴 Scene Component，让其围绕铰链旋转。']],
    check:'只有靠近门才能触发 E 键开门；离开碰撞区域后不会继续触发。'
  },
  {
    id:'health-ui',module:'UI 系统',level:'进阶起点',minutes:35,
    title:'把生命值显示成血条',description:'使用 Widget 和 Progress Bar，把角色属性变成玩家能看到的 UI。',
    badge:'UI 系统 01',outcome:'受伤时，屏幕上的血条比例与角色血量同步。',
    premise:'已完成“为角色添加生命值”，CurrentHealth 和 MaxHealth 都能正常更新。',
    concept:'Progress Bar 使用 0 到 1 的填充比例，不是直接接受 0 到 100 的生命数值。它的百分比 = 当前生命值 ÷ 最大生命值。',
    flow:['读取玩家角色','获得 Current / Max','除法得到比例','设置 Progress Bar.Percent'],
    nodes:[
      {label:'Get Player Character',type:'函数',desc:'获得角色引用'},
      {label:'Get CurrentHealth / MaxHealth',type:'变量',desc:'读取生命属性'},
      {label:'Float / Float',type:'运算',desc:'产生 0 到 1 的比例'},
      {label:'Set Percent',type:'UI 函数',desc:'更新进度条'}
    ],
    steps:[
      {title:'新建 Widget 蓝图',body:'在内容浏览器新建 User Interface → Widget Blueprint，命名 WBP_HUD。打开 Designer，拖入 Progress Bar，把变量名称改为 HPBar。',help:'Progress Bar 的 Percent 为 1 时填满，为 0 时为空。'},
      {title:'让 Widget 出现在屏幕上',body:'在角色 BeginPlay 中使用 Create Widget（Class = WBP_HUD），对返回值调用 Add to Viewport。先运行检查血条是否可见。',help:'创建 Widget 和更新 Widget 是两件不同的事。'},
      {title:'计算显示比例',body:'在 WBP_HUD 中建立更新函数 UpdateHP，接收 CurrentHealth 和 MaxHealth 两个 Float 参数。先确保 MaxHealth 大于 0，再用 CurrentHealth / MaxHealth，最后对 HPBar 调用 Set Percent。',help:'用函数显式更新，比在每帧绑定所有属性更易理解和优化。'},
      {title:'血量变化时调用更新',body:'将 Create Widget 的返回值保存为角色变量 HUDRef。角色 CurrentHealth 更新后，判断 HUDRef 有效，再调用 UpdateHP 并传入当前值与最大值；BeginPlay 创建成功后也调用一次初始化。',help:'只在数据变化时更新 UI，就不必在 Event Tick 中重复计算。'}
    ],
    params:[['Percent','0.0 ~ 1.0','Progress Bar 的填充比例'],['Current / Max','如 75 / 100','显示为 75%'],['HUDRef','WBP_HUD 引用','用于主动刷新界面']],
    pitfalls:[['血条一直满格','检查是否直接把 CurrentHealth = 75 传给了 Percent，应该传 0.75。'],['受伤后界面不刷新','检查扣血完成后是否调用了 UpdateHP。'],['出现空引用报错','在使用 HUDRef 前先做 Is Valid 判断。']],
    check:'100/100 显示满血，75/100 显示 75%，0/100 显示空血条。'
  }
];
