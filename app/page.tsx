'use client';

import { useState } from 'react';

const services = [
  ['📦', '包裹预报', '提前登记快递单号'], ['🧳', '打包申请', '选择包裹合箱发货'],
  ['🏠', '仓库地址', '查看日本收货地址'], ['🔍', '包裹认领', '认领无主入库包裹'],
  ['💴', '在线充值', '账户余额快速充值'], ['🧮', '运费试算', '预估不同渠道费用'],
  ['🚚', '集运服务', '流程、收费与禁运品'], ['🔔', '消息通知', '掌握包裹最新状态'],
];

const routes = [
  { name: '服装鞋帽大货专线', price: '¥1,900 起', time: '5–10天', tag: '热门' },
  { name: '日中空运快捷线', price: '¥2,400 起', time: '3–7天', tag: '推荐' },
  { name: '普货经济海运线', price: '¥780 起', time: '12–18天', tag: '实惠' },
];

export default function Home() {
  const [tracking, setTracking] = useState('');
  const [message, setMessage] = useState('');
  const [noticeOpen, setNoticeOpen] = useState(true);
  const [activeView, setActiveView] = useState<string | null>(null);

  function track() {
    setMessage(tracking.trim() ? `正在查询：${tracking.trim()}` : '请输入集运单号');
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="brand-mark">八</div><div><p className="eyebrow">HAPPO EXPRESS</p><h1>八方转运</h1></div>
        <button className="support" aria-label="联系客服">客服</button>
      </header>
      <section className="hero">
        <p className="hero-kicker">日本寄往中国 · 一站式跨境集运</p>
        <h2>让每一个包裹，<br />安心抵达家门</h2>
        <div className="track-box"><input value={tracking} onChange={(e) => setTracking(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && track()} placeholder="请输入集运单号" aria-label="集运单号" /><button onClick={track}>追踪包裹</button></div>
        {message && <p className="track-message">{message}</p>}
      </section>
      <section className="section services-section">
        <div className="section-title"><div><span>OUR SERVICES</span><h3>集运功能</h3></div><button>全部服务 ›</button></div>
        <div className="service-grid">{services.map(([icon, title, desc]) => <button className="service-card" key={title} onClick={() => setActiveView(title)}><span className="service-icon">{icon}</span><strong>{title}</strong><small>{desc}</small></button>)}</div>
      </section>
      <section className="section routes-section">
        <div className="section-title"><div><span>SHIPPING LINES</span><h3>热门渠道时效</h3></div><button>查看运价 ›</button></div>
        <div className="route-list">{routes.map((route, i) => <article className="route-card" key={route.name}><div className={`route-logo route-${i}`}>✈</div><div className="route-copy"><div><b>{route.name}</b><em>{route.tag}</em></div><p>预计时效 {route.time} · 全程物流追踪</p></div><strong>{route.price}</strong></article>)}</div>
      </section>
      <section className="section news-section">
        <div className="section-title"><div><span>LATEST NEWS</span><h3>集运资讯</h3></div><button>查看更多 ›</button></div>
        <article className="featured-news"><div className="news-date"><b>22</b><span>AUG</span></div><div><em>公告</em><h4>日本仓库入库及包裹预报须知</h4><p>为确保您的包裹能够快速准确入库，请务必在收件地址中填写专属会员ID。</p></div></article>
        <div className="news-row"><span>服务</span><b>新用户集运操作指南</b><time>2026-08-18</time></div><div className="news-row"><span>物流</span><b>近期各渠道运输时效说明</b><time>2026-08-15</time></div>
      </section>
      <footer><b>八方转运</b><p>专业、安全、便捷的日中跨境集运服务</p><small>© 2026 Happo Express. All Rights Reserved.</small></footer>
      <nav className="bottom-nav">{['⌂|首页', '▣|我的包裹', '▤|我的订单', '♙|会员中心'].map((item, i) => { const [icon,label] = item.split('|'); return <button className={i === 0 && !activeView ? 'active' : activeView === label ? 'active' : ''} onClick={() => i === 0 ? setActiveView(null) : setActiveView(label)} key={label}><span>{icon}</span>{label}</button>; })}</nav>
      {noticeOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="网站公告"><div className="notice-modal"><button className="modal-close" onClick={() => setNoticeOpen(false)}>×</button><div className="notice-symbol">八</div><p className="eyebrow">WELCOME TO HAPPO</p><h3>欢迎来到八方转运</h3><p>日本仓库全年为您提供专业的包裹入库、合箱、转运与物流追踪服务。</p><button className="primary" onClick={() => setNoticeOpen(false)}>知道了</button></div></div>}
      {activeView && <FeaturePanel title={activeView} close={() => setActiveView(null)} done={(text) => { setMessage(text); setActiveView(null); window.scrollTo({top:0,behavior:'smooth'}); }} />}
    </main>
  );
}

function FeaturePanel({title, close, done}:{title:string;close:()=>void;done:(text:string)=>void}) {
  return <div className="panel-backdrop"><section className="feature-panel"><header><button onClick={close}>‹</button><h2>{title}</h2><span /></header><div className="panel-body">{title === '运费试算' ? <><label>目的地<select><option>中国大陆</option><option>中国香港</option><option>中国台湾</option></select></label><div className="field-row"><label>实际重量（KG）<input type="number" placeholder="0.0" /></label><label>运输渠道<select><option>空运快捷线</option><option>经济海运线</option></select></label></div><div className="field-row"><label>长（CM）<input type="number" /></label><label>宽（CM）<input type="number" /></label><label>高（CM）<input type="number" /></label></div><button className="panel-primary" onClick={() => done('运费试算完成：示例价格 ¥2,400 起')}>查询报价</button></> : title === '仓库地址' ? <div className="warehouse-card"><span>日本收货仓库</span><h3>株式会社 日本八方</h3><dl><dt>邮编</dt><dd>〒196-0022</dd><dt>地址</dt><dd>東京都昭島市中神町3-7-34（会员ID）</dd><dt>收件人</dt><dd>黄（コウ）様</dd><dt>电话</dt><dd>042-8080-899</dd></dl><button className="panel-primary" onClick={() => done('仓库地址已复制')}>复制完整地址</button></div> : title === '包裹预报' ? <><label>日本快递公司<select><option>佐川急便</option><option>ヤマト運輸</option><option>日本郵便</option></select></label><label>快递单号<input placeholder="请输入日本国内快递单号" /></label><label>商品名称<input placeholder="例如：衣服、玩偶、日用品" /></label><label>备注<textarea placeholder="选填" /></label><button className="panel-primary" onClick={() => done('包裹预报已保存（演示数据）')}>提交预报</button></> : title === '我的包裹' ? <><div className="tabs"><b>全部 3</b><span>已入库 2</span><span>待打包 1</span></div><PackageCard code="JP02631-001" status="已入库" weight="2.35kg"/><PackageCard code="JP02631-002" status="已入库" weight="1.80kg"/><PackageCard code="JP02631-003" status="预报中" weight="--"/></> : title === '我的订单' ? <><div className="empty-state"><i>▤</i><h3>暂无集运订单</h3><p>包裹入库后，可选择多个包裹提交打包申请。</p><button className="panel-primary" onClick={() => done('已返回包裹列表')}>查看我的包裹</button></div></> : <Login title={title} done={done} />}</div></section></div>
}

function PackageCard({code,status,weight}:{code:string;status:string;weight:string}) { return <article className="package-card"><div><b>{code}</b><em>{status}</em></div><p>佐川急便 · 追踪号 3580 1234 5678</p><footer><span>入库重量</span><strong>{weight}</strong></footer></article> }
function Login({title,done}:{title:string;done:(text:string)=>void}) { return <div className="login-box"><div className="notice-symbol">八</div><h3>{title === '会员中心' ? '登录会员中心' : `${title}需要登录`}</h3><p>登录后即可查看包裹、订单、余额与消息。</p><label>会员账号<input placeholder="会员ID / 手机号 / 邮箱" /></label><label>密码<input type="password" placeholder="请输入登录密码" /></label><button className="panel-primary" onClick={() => done('已进入会员中心演示模式')}>登录</button><button className="text-button">微信一键注册 / 登录</button></div> }
