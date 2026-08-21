'use client';

import { useState } from 'react';
import styles from './admin.module.css';

const menu = [
  ['▦', '工作台'], ['▣', '集运管理'], ['⌂', '仓库货架'], ['¥', '报价系统'],
  ['♙', '客户管理'], ['▥', '统计报表'], ['◇', '活动管理'], ['◉', '财务系统'], ['⚙', '基础资料'],
];

const stats = [
  ['会员总数', '4,645', '+12.8%', 'members'], ['包裹总数', '40,171', '+18.2%', 'packages'],
  ['集运订单', '9,405', '+9.6%', 'orders'], ['待核转账', '159', '需处理', 'payments'],
];

const steps = [
  ['01', '扫描入库', '识别快递单号与会员'], ['02', '称重上架', '记录重量、尺寸和仓位'],
  ['03', '打包核对', '合箱、分箱与费用确认'], ['04', '装袋出库', '绑定物流单号并发货'],
];

export default function AdminDashboard() {
  const [active, setActive] = useState('工作台');
  return <main className={styles.shell}>
    <aside className={styles.sidebar}>
      <div className={styles.logo}><b>八</b><span>八方转运<small>OPERATIONS</small></span></div>
      <nav>{menu.map(([icon,label],i)=><button onClick={()=>setActive(label)} className={active===label?styles.active:''} key={label}><i>{icon}</i><span>{label}</span>{i>0&&<em>›</em>}</button>)}</nav>
      <div className={styles.staff}><span>仓</span><div><b>八方物流</b><small>仓库人员</small></div><button>⋯</button></div>
    </aside>

    <section className={styles.workspace}>
      <header className={styles.topbar}><div><p>2026年8月22日 · 星期六</p><h1>{active==='工作台'?'运营工作台':active}</h1></div><div className={styles.actions}><button aria-label="搜索">⌕</button><button aria-label="消息">♢<i>3</i></button><button onClick={()=>setActive('集运管理')} className={styles.primary}>＋ 扫描入库</button></div></header>
      {active==='工作台'?<div className={styles.content}>
        <section className={styles.welcome}><div><span>HAPPO EXPRESS</span><h2>早上好，仓库同事</h2><p>今天有 <b>28</b> 件预报包裹等待入库，<b>12</b> 个订单等待打包。</p></div><button onClick={()=>setActive('集运管理')}>开始扫描 →</button></section>
        <div className={styles.stats}>{stats.map(([label,value,change,type])=><article key={label}><div className={`${styles.statIcon} ${styles[type]}`}>{type==='members'?'♙':type==='packages'?'▣':type==='orders'?'▤':'¥'}</div><div><p>{label}</p><strong>{value}</strong></div><em>{change}</em></article>)}</div>
        <div className={styles.grid}>
          <section className={styles.card}><header><div><span>WAREHOUSE FLOW</span><h3>今日仓库流程</h3></div><button>查看全部</button></header><div className={styles.flow}>{steps.map(([num,title,desc],i)=><div className={styles.step} key={title}><i>{num}</i><div><b>{title}</b><p>{desc}</p></div><strong>{[28,16,12,34][i]}</strong></div>)}</div></section>
          <section className={styles.card}><header><div><span>QUICK ACTIONS</span><h3>快捷操作</h3></div></header><div className={styles.quick}><button onClick={()=>setActive('集运管理')}><i>⌁</i><b>扫描入库</b><small>扫码登记</small></button><button onClick={()=>setActive('集运管理')}><i>▦</i><b>包裹清单</b><small>查询状态</small></button><button onClick={()=>setActive('集运管理')}><i>▤</i><b>订单管理</b><small>打包出库</small></button><button onClick={()=>setActive('仓库货架')}><i>⌂</i><b>扫描上架</b><small>分配仓位</small></button></div></section>
        </div>
        <section className={styles.card}><header><div><span>RECENT ACTIVITY</span><h3>最新仓库动态</h3></div><div className={styles.filters}><button className={styles.selected}>全部</button><button>入库</button><button>打包</button><button>出库</button></div></header><div className={styles.table}><div className={styles.tableHead}><span>时间</span><span>业务编号</span><span>会员ID</span><span>操作类型</span><span>重量</span><span>状态</span></div>{[
          ['10:42','JP02631-00482','JP02631','扫描入库','2.35 kg','已入库'],['10:38','PKG-20260822-147','JP01842','打包完成','5.80 kg','待付款'],['10:31','JP09415-00211','JP09415','扫描上架','1.20 kg','A-03-18'],['10:24','ORD-20260822-089','JP04127','扫描出货','8.65 kg','已发货']
        ].map(row=><div className={styles.tableRow} key={row[1]}>{row.map((cell,i)=><span key={cell} className={i===5?styles.badge:''}>{cell}</span>)}</div>)}</div></section>
      </div>:<ModuleView module={active}/>} 
    </section>
  </main>;
}

function ModuleView({module}:{module:string}) {
  const [scan,setScan]=useState('');
  const [notice,setNotice]=useState('');
  const packages=[['JP02631-00482','JP02631','佐川急便','2.35 kg','A-03-18','已入库'],['JP01842-00147','JP01842','ヤマト運輸','1.80 kg','B-01-06','待打包'],['JP09415-00211','JP09415','日本郵便','1.20 kg','A-02-11','已上架'],['JP04127-00089','JP04127','佐川急便','8.65 kg','C-04-02','已发货']];
  if(module==='集运管理') return <div className={styles.modulePage}><section className={styles.scanHero}><div><span>SCAN RECEIVING</span><h2>扫描入库</h2><p>扫描日本国内快递单号，自动匹配会员预报。</p></div><div className={styles.scanBox}><input autoFocus value={scan} onChange={e=>setScan(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&scan){setNotice(`已识别快递单号 ${scan}`);setScan('')}}} placeholder="请扫描或输入快递单号"/><button onClick={()=>{if(scan){setNotice(`已识别快递单号 ${scan}`);setScan('')}}}>确认入库</button></div>{notice&&<strong className={styles.scanNotice}>✓ {notice}</strong>}</section><section className={styles.card}><header><div><span>PACKAGE LIST</span><h3>近期包裹</h3></div><div className={styles.filters}><button className={styles.selected}>全部</button><button>待入库</button><button>已入库</button><button>异常件</button></div></header><div className={styles.packageTable}><div className={styles.packageHead}><span>包裹编号</span><span>会员ID</span><span>快递公司</span><span>重量</span><span>仓位</span><span>状态</span></div>{packages.map(row=><div className={styles.packageLine} key={row[0]}>{row.map((v,i)=><span className={i===5?styles.badge:''} key={v}>{v}</span>)}</div>)}</div></section></div>;
  const configs:Record<string,[string,string,string][]>={
    '仓库货架':[['仓库管理','3 个仓库','管理仓库地址和状态'],['货架区域','18 个区域','配置库区与容量'],['货架号管理','426 个货架','查询包裹所在仓位'],['自提点','6 个站点','管理自提服务']],
    '报价系统':[['运输渠道','8 条渠道','时效、限制与服务范围'],['集运价格','32 套价格','首重、续重和会员价'],['计费参数','12 项规则','体积系数与进位规则'],['偏远附加费','可配置','按国家和邮编设置']],
    '客户管理':[['客户信息','4,645 位会员','会员资料与账户状态'],['客户组','5 个等级','分组运价和权益'],['客户地址','8,920 条','收货地址管理'],['信息通知','待发送 23 条','站内信和物流通知']],
    '统计报表':[['运单统计','实时更新','渠道、重量和状态'],['订单统计','实时更新','收入、成本和利润'],['客户统计','实时更新','新增与活跃会员'],['货架统计','实时更新','库存与周转效率']],
    '活动管理':[['优惠券管理','6 个活动','门槛、额度和有效期'],['弹窗公告','2 条生效','会员端首页公告']],
    '财务系统':[['银行转账','159 笔待核','审核客户汇款'],['客户账单','完整流水','充值、扣款和退款'],['在线支付','自动对账','支付渠道交易记录'],['积分优惠券','营销资产','积分和券的发放使用']],
    '基础资料':[['快递公司','14 家','日本与国际承运商'],['汇率设置','每日更新','多币种换算'],['人员与角色','8 个角色','部门、员工和权限'],['系统设置','全局配置','编号、消息和业务规则']],
  };
  return <div className={styles.modulePage}><section className={styles.moduleIntro}><span>HAPPO OPERATIONS</span><h2>{module}</h2><p>集中管理{module}相关的业务资料、规则和操作记录。</p></section><div className={styles.configGrid}>{(configs[module]||[]).map(([title,count,desc])=><button key={title}><i>↗</i><span>{title}</span><strong>{count}</strong><small>{desc}</small></button>)}</div></div>;
}
