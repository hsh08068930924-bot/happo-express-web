'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function AdminLogin(){
  const router=useRouter(); const [error,setError]=useState('');
  function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const data=new FormData(e.currentTarget);if(!data.get('company')||!data.get('account')||!data.get('password')){setError('请完整填写公司识别码、账号和密码');return}router.push('/admin')}
  return <main className={styles.page}><section className={styles.brand}><div className={styles.logo}>八</div><span>HAPPO EXPRESS · OPERATIONS</span><h1>让仓库作业，<br/>更快一步。</h1><p>包裹入库、称重上架、合箱打包、装袋出库，所有环节都在一个系统内完成。</p><div className={styles.points}><i>01</i><span>实时掌握仓库库存与订单状态</span><i>02</i><span>扫码枪优先的高效率操作流程</span><i>03</i><span>完整记录资金与员工操作轨迹</span></div></section><section className={styles.login}><form onSubmit={submit}><div className={styles.mobileLogo}>八</div><span>SECURE ACCESS</span><h2>登录运营后台</h2><p>请使用公司分配的员工账号登录</p><label>公司识别码<input name="company" placeholder="请输入识别码" autoFocus/></label><label>员工账号<input name="account" placeholder="请输入账号"/></label><label>登录密码<input name="password" type="password" placeholder="请输入密码"/></label>{error&&<strong>{error}</strong>}<button>安全登录 →</button><small>演示版本不会向服务器提交您输入的内容</small></form></section></main>
}
