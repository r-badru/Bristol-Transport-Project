import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';

const W=[
{w:"Hartcliffe & Withywood",pop:19318,tdi:85.9,tp:2.69,te:93.3,td:1,sd:1.55,inc:35633,nc:34.1,gh:73.7,ls:53.9,mw:35.9,sa:31.7,fi:17.3,fc:39,lp:28.6,qu:28,ag:78,pr:"Highest Priority",cl:"#DC2626",cw:11.9,cwk:6.4,dw:40.2,bw:23.8,wcw:15.8,pl:22.9,cs:18.6,nt:40.4,bs:44.8,ln:12.1,st:58.3,ia:17,dp:"High",ds:5,ab:"Very High",an:"peripheral, cultural mobility; strong townhall evidence",p65:2601,fsm:52.8,sen:26.3,dis:52,rt:18.1,wa:11199},
{w:"Lawrence Hill",pop:20364,tdi:82.8,tp:2.35,te:100,td:0,sd:5.4,inc:40900,nc:47.9,gh:82.7,ls:57.1,mw:18.4,sa:41.7,fi:10.5,fc:29.8,lp:27.4,qu:26.8,ag:74,pr:"Highest Priority",cl:"#DC2626",cw:36.8,cwk:18.7,dw:26.8,bw:20.7,wcw:37.9,pl:17,cs:12,nt:31.1,bs:48.3,ln:8.9,st:66,ia:7.6,dp:"High",ds:5,ab:"Very High",an:"isolation, poor access; cultural exclusion",p65:980,fsm:48.1,sen:22.8,dis:46.5,rt:15.0,wa:13497},
{w:"Bishopsworth",pop:12478,tdi:74.8,tp:2.15,te:66.7,td:1,sd:1.6,inc:44550,nc:17.4,gh:83.3,ls:73.5,mw:17.9,sa:59.9,fi:5.5,fc:17.6,lp:22.4,qu:24.3,ag:70,pr:"High-Need",cl:"#EA580C",cw:10.2,cwk:2.4,dw:52,bw:17.3,wcw:9.8,pl:30.5,cs:13.8,nt:46.8,bs:47.2,ln:3.7,st:79.8,ia:11.5,dp:"High",ds:5,ab:"High",an:"peripheral exclusion; disconnected estate",p65:2279,fsm:20.3,sen:14.7,dis:20.7,rt:7.0,wa:7563},
{w:"Filwood",pop:14430,tdi:72.1,tp:2.62,te:73.3,td:0,sd:4.85,inc:36700,nc:27.8,gh:78.3,ls:64.5,mw:22.5,sa:42.5,fi:9.2,fc:30.8,lp:23.8,qu:23.7,ag:72,pr:"High-Need",cl:"#EA580C",cw:13.8,cwk:9.1,dw:51.8,bw:9.4,wcw:22.4,pl:20,cs:15,nt:45.8,bs:38.3,ln:6,st:66.3,ia:12.7,dp:"High",ds:5,ab:"High",an:"cost, poor access; high deprivation",p65:1635,fsm:47.8,sen:21.3,dis:48.1,rt:4.3,wa:8926},
{w:"Hengrove & Whitchurch Park",pop:19415,tdi:71.2,tp:2.18,te:66.7,td:0,sd:2.58,inc:44100,nc:18,gh:82.9,ls:69.5,mw:19.4,sa:55,fi:7.4,fc:21.7,lp:21.2,qu:22.5,ag:68,pr:"High-Need",cl:"#EA580C",cw:7.3,cwk:1.2,dw:57.4,bw:10.9,wcw:11.7,pl:37.8,cs:12.9,nt:54.3,bs:33.7,ln:3.9,st:64.1,ia:12.3,dp:"High",ds:5,ab:"High",an:"off-peak gaps, accessibility barriers",p65:3935,fsm:29.3,sen:20,dis:29.5,rt:3.4,wa:10846},
{w:"Stockwood",pop:12103,tdi:69.3,tp:2.24,te:66.7,td:0,sd:3.3,inc:42800,nc:18.9,gh:78.2,ls:63.7,mw:15.6,sa:59.3,fi:8.9,fc:21.5,lp:22.1,qu:22,ag:70,pr:"High-Need",cl:"#EA580C",cw:4.6,cwk:2.1,dw:69.2,bw:15.7,wcw:7.7,pl:29.7,cs:8.8,nt:46.2,bs:40.6,ln:4.8,st:62.9,ia:15.4,dp:"High",ds:5,ab:"High",an:"peripheral, poor connectivity",p65:2741,fsm:22.4,sen:13.9,dis:24.1,rt:1.5,wa:6874},
{w:"Easton",pop:14330,tdi:68.5,tp:2.27,te:86.7,td:0,sd:5.58,inc:42300,nc:30.5,gh:79.5,ls:65.5,mw:20.3,sa:54.8,fi:5.7,fc:20.1,lp:20.1,qu:21.8,ag:68,pr:"High-Need",cl:"#EA580C",cw:50.7,cwk:48.3,dw:16.6,bw:11.1,wcw:64.9,pl:20.1,cs:13.5,nt:42.4,bs:38.5,ln:5.5,st:79.7,ia:5,dp:"High",ds:5,ab:"High",an:"fragmentation and exclusion",p65:1172,fsm:26.2,sen:21,dis:25.5,rt:0.7,wa:10217},
{w:"Avonmouth & Lawrence Weston",pop:22446,tdi:67.2,tp:2.24,te:66.7,td:0,sd:4.01,inc:42900,nc:23.3,gh:77.5,ls:54.1,mw:22.5,sa:53.8,fi:7.2,fc:20.3,lp:19.2,qu:20.5,ag:62,pr:"High-Need",cl:"#EA580C",cw:23.5,cwk:12.2,dw:51.7,bw:7.7,wcw:17.8,pl:20.4,cs:9.3,nt:49.3,bs:42.7,ln:4.5,st:64.4,ia:13.3,dp:"High",ds:5,ab:"Medium",an:"isolation, cuts, poor promotion",p65:3484,fsm:32.7,sen:18,dis:34.7,rt:-0.6,wa:13356},
{w:"Knowle",pop:14290,tdi:66.1,tp:2.09,te:73.3,td:0,sd:6.3,inc:45900,nc:21.8,gh:80.5,ls:69,mw:20,sa:63.1,fi:4.2,fc:13.7,lp:19.3,qu:19.1,ag:66,pr:"High-Need",cl:"#EA580C",cw:15,cwk:9.8,dw:36,bw:12.4,wcw:27.8,pl:24.1,cs:14,nt:44,bs:40.4,ln:4.1,st:74.6,ia:7.5,dp:"High",ds:5,ab:"High",an:"long journeys, elderly mobility",p65:2006,fsm:25.3,sen:18.3,dis:25.8,rt:-1.7,wa:8805},
{w:"Southmead",pop:13434,tdi:64.9,tp:2.2,te:73.3,td:0,sd:5.21,inc:43600,nc:26.9,gh:76.3,ls:59.2,mw:26.7,sa:47,fi:7,fc:24.8,lp:20.7,qu:21,ag:64,pr:"High-Need",cl:"#EA580C",cw:19.5,cwk:13.7,dw:35.8,bw:12.6,wcw:34.5,pl:18.2,cs:11.8,nt:42.1,bs:45.2,ln:5.7,st:70.7,ia:10.6,dp:"High",ds:5,ab:"High",an:"night services, cultural inclusion",p65:1953,fsm:32.6,sen:17.7,dis:33.7,rt:-2.9,wa:8027},
{w:"Hillfields",pop:13459,tdi:62.6,tp:2.24,te:60,td:0,sd:2.23,inc:42950,nc:19.3,gh:82.4,ls:64.6,mw:28.7,sa:44.9,fi:5.4,fc:22.6,lp:17.9,qu:16.4,ag:60,pr:"Moderate Need",cl:"#F59E0B",cw:24.5,cwk:13.4,dw:41.5,bw:14.1,wcw:19.1,pl:20.7,cs:16.8,nt:43.3,bs:57.9,ln:3.5,st:71,ia:9.3,dp:"Medium-High",ds:4,ab:"High",an:"hostility to disabled, stop spacing",p65:1637,fsm:27.8,sen:18.9,dis:29.6,rt:6.0,wa:8308},
{w:"Hotwells & Harbourside",pop:6524,tdi:61.3,tp:2.06,te:80,td:0,sd:6.13,inc:46600,nc:39.9,gh:91.7,ls:70.3,mw:16.3,sa:75.1,fi:3.7,fc:10.8,lp:11.1,qu:9.5,ag:36,pr:"Latent Demand",cl:"#3B82F6",cw:30.9,cwk:18.5,dw:14.5,bw:10.8,wcw:57.3,pl:25.6,cs:18.2,nt:36.8,bs:44.6,ln:2.5,st:77.1,ia:3.5,dp:"Medium-High",ds:4,ab:"Medium",an:"isolation, cultural limits; high no-car rate",p65:517,fsm:21.1,sen:13.6,dis:19.7,rt:4.7,wa:5067},
{w:"Frome Vale",pop:14573,tdi:59.6,tp:2.13,te:60,td:0,sd:6.18,inc:45100,nc:23.1,gh:86,ls:72.6,mw:15.1,sa:52.7,fi:8.5,fc:21.6,lp:15.4,qu:12.2,ag:54,pr:"Moderate Need",cl:"#F59E0B",cw:21.3,cwk:14.8,dw:43,bw:28.3,wcw:22.3,pl:29.2,cs:7.1,nt:50.7,bs:48.8,ln:5.3,st:63.1,ia:10.5,dp:"Medium-High",ds:4,ab:"Medium",an:"none noted",p65:2497,fsm:28.2,sen:18.1,dis:29.1,rt:3.0,wa:8944},
{w:"Brislington East",pop:12254,tdi:58.7,tp:2.06,te:53.3,td:0,sd:3.26,inc:46700,nc:19.1,gh:76.4,ls:55.4,mw:25.5,sa:63.8,fi:6.1,fc:16.9,lp:17.6,qu:13.5,ag:52,pr:"Moderate Need",cl:"#F59E0B",cw:16,cwk:8.5,dw:48.9,bw:19.4,wcw:20.8,pl:34.9,cs:15.6,nt:62.5,bs:26.1,ln:4.6,st:72.8,ia:7.7,dp:"Medium-High",ds:4,ab:"Medium",an:"connectivity and reliability; poor connections",p65:1785,fsm:25.5,sen:18.7,dis:26.4,rt:2.1,wa:7879},
{w:"Eastville",pop:14998,tdi:58.1,tp:2.03,te:60,td:0,sd:6,inc:47300,nc:24.9,gh:82.3,ls:62.2,mw:26.4,sa:56.1,fi:6.7,fc:21.1,lp:16.5,qu:15.4,ag:56,pr:"Moderate Need",cl:"#F59E0B",cw:37.8,cwk:31.3,dw:24,bw:22.4,wcw:43.2,pl:26.2,cs:17.2,nt:49.1,bs:39.2,ln:3.8,st:74,ia:7.8,dp:"Medium-High",ds:4,ab:"Medium",an:"none noted",p65:1580,fsm:26.8,sen:18.1,dis:26.5,rt:1.5,wa:10231},
{w:"St George Central",pop:13090,tdi:56.4,tp:2.19,te:60,td:0,sd:2.29,inc:43900,nc:22.2,gh:81,ls:60.1,mw:19.7,sa:55.3,fi:5,fc:17.8,lp:15.8,qu:14.4,ag:48,pr:"Moderate Need",cl:"#F59E0B",cw:19.5,cwk:13.8,dw:48.1,bw:16.7,wcw:24,pl:14.5,cs:7.3,nt:40.9,bs:50.7,ln:4.6,st:67,ia:9.2,dp:"Medium-High",ds:4,ab:"Medium",an:"overcrowding and peak time",p65:1738,fsm:25.9,sen:17.7,dis:27.4,rt:-0.2,wa:8620},
{w:"Bedminster",pop:12941,tdi:54.7,tp:1.98,te:53.3,td:0,sd:7.73,inc:48550,nc:25.9,gh:90.7,ls:73.3,mw:14.9,sa:65.8,fi:4.1,fc:10.7,lp:11.5,qu:11.2,ag:48,pr:"Moderate Need",cl:"#F59E0B",cw:25.3,cwk:17.1,dw:22.1,bw:17.7,wcw:48.3,pl:22.7,cs:8.5,nt:50.8,bs:32.2,ln:3.4,st:64.9,ia:7.3,dp:"Medium",ds:3,ab:"Medium",an:"unreliable, poor connections",p65:1742,fsm:16.2,sen:15.6,dis:16.7,rt:9.3,wa:9053},
{w:"Henbury & Brentry",pop:13488,tdi:54.1,tp:2.07,te:60,td:0,sd:5.19,inc:46300,nc:22.5,gh:82.4,ls:65.3,mw:20.4,sa:53.2,fi:5.7,fc:18.7,lp:14.1,qu:12.8,ag:50,pr:"Moderate Need",cl:"#F59E0B",cw:9.9,cwk:4.8,dw:52.1,bw:15.2,wcw:14.2,pl:11.1,cs:12.3,nt:45.8,bs:42.6,ln:4.8,st:73.8,ia:11.6,dp:"Medium-High",ds:4,ab:"Medium",an:"frequency and affordability",p65:2169,fsm:32.6,sen:20.2,dis:34.8,rt:-2.5,wa:8036},
{w:"St George West",pop:7003,tdi:53.2,tp:2.19,te:60,td:0,sd:5.71,inc:43900,nc:27.4,gh:84.3,ls:59.4,mw:25.3,sa:49.1,fi:4.9,fc:20.8,lp:13.4,qu:11.5,ag:42,pr:"Stable",cl:"#10B981",cw:30.3,cwk:27,dw:27.4,bw:10.7,wcw:52.3,pl:11.8,cs:8.7,nt:42.7,bs:47,ln:5.3,st:78.6,ia:8.9,dp:"Medium-High",ds:4,ab:"Medium",an:"none noted",p65:798,fsm:22.6,sen:19.8,dis:23.6,rt:-3.4,wa:4876},
{w:"Central",pop:21128,tdi:52.9,tp:2.22,te:86.7,td:0,sd:4.73,inc:43300,nc:57.3,gh:75.9,ls:56.5,mw:31.2,sa:57.4,fi:7,fc:21.7,lp:9.4,qu:7.7,ag:28,pr:"Latent Demand",cl:"#3B82F6",cw:23,cwk:9.6,dw:14.8,bw:10,wcw:57.3,pl:25.8,cs:20.9,nt:38,bs:33.5,ln:8.1,st:66.3,ia:5.5,dp:"High",ds:5,ab:"Medium",an:"cost and overcrowding; highest no-car rate",p65:409,fsm:37,sen:21.2,dis:35.9,rt:-14.9,wa:16391},
{w:"Windmill Hill",pop:13861,tdi:50.7,tp:1.83,te:66.7,td:0,sd:6.49,inc:52550,nc:25.5,gh:87.3,ls:71.2,mw:19.1,sa:66,fi:5.4,fc:13.9,lp:12.8,qu:11.1,ag:44,pr:"Stable",cl:"#10B981",cw:31.4,cwk:17.2,dw:23,bw:13,wcw:44.6,pl:19.7,cs:7.2,nt:46.1,bs:31.8,ln:3.9,st:78.9,ia:4.6,dp:"Medium-High",ds:4,ab:"Medium",an:"unreliable services, poor connections",p65:1177,fsm:20.1,sen:16,dis:20.8,rt:-5.9,wa:10016},
{w:"Brislington West",pop:11980,tdi:47.5,tp:1.9,te:46.7,td:0,sd:2.5,inc:50450,nc:20.2,gh:80.7,ls:65.1,mw:15.8,sa:64.5,fi:3.8,fc:11.8,lp:12.2,qu:9.8,ag:38,pr:"Stable",cl:"#10B981",cw:28.5,cwk:18.4,dw:37.2,bw:20.8,wcw:27.6,pl:31.1,cs:17.4,nt:52.8,bs:40.8,ln:4.5,st:75.7,ia:7.3,dp:"Medium-High",ds:4,ab:"Low",an:"none noted",p65:1655,fsm:22.1,sen:17.9,dis:22.8,rt:-9.1,wa:8000},
{w:"Horfield",pop:14013,tdi:46.3,tp:2.05,te:53.3,td:0,sd:6.42,inc:46850,nc:22.6,gh:83.8,ls:64.5,mw:17.4,sa:65.1,fi:7.3,fc:17.7,lp:13.8,qu:10.1,ag:40,pr:"Stable",cl:"#10B981",cw:32.1,cwk:20.8,dw:40.5,bw:10.4,wcw:39.6,pl:21.6,cs:11.5,nt:48,bs:47.7,ln:4.9,st:71.5,ia:7.7,dp:"Medium",ds:3,ab:"Medium",an:"none noted",p65:1669,fsm:24.7,sen:15.8,dis:25.3,rt:0.9,wa:9620},
{w:"Southville",pop:12896,tdi:45.1,tp:1.71,te:53.3,td:0,sd:7.75,inc:56100,nc:30.2,gh:83.5,ls:70,mw:14.6,sa:67.2,fi:4.9,fc:15.3,lp:10.1,qu:8.8,ag:34,pr:"Stable",cl:"#10B981",cw:32.5,cwk:20.2,dw:28.3,bw:9,wcw:55.6,pl:28.3,cs:13.8,nt:39,bs:36.9,ln:3.2,st:61.4,ia:3.5,dp:"Medium",ds:3,ab:"Low",an:"none noted",p65:1118,fsm:13,sen:14.7,dis:13.3,rt:-0.3,wa:9696},
{w:"Lockleaze",pop:13626,tdi:44.8,tp:2.18,te:60,td:0,sd:4.4,inc:44000,nc:24.3,gh:81.5,ls:59,mw:16.8,sa:58.5,fi:7.5,fc:19.4,lp:14.5,qu:13,ag:50,pr:"Moderate Need",cl:"#F59E0B",cw:29.8,cwk:24.6,dw:30.3,bw:16.7,wcw:37.6,pl:24.4,cs:14.9,nt:50.6,bs:35.9,ln:4.3,st:67.2,ia:11.5,dp:"Medium-High",ds:4,ab:"Medium",an:"affordability and frequency",p65:1587,fsm:32.4,sen:20.7,dis:32.9,rt:-11.8,wa:8771},
{w:"Redland",pop:13595,tdi:41.5,tp:1.88,te:40,td:0,sd:10.3,inc:51200,nc:17.7,gh:84.4,ls:77.1,mw:15.9,sa:77.4,fi:4.5,fc:7.3,lp:7.2,qu:5.5,ag:26,pr:"Stable",cl:"#10B981",cw:35.7,cwk:25,dw:28.7,bw:6,wcw:47.3,pl:13.5,cs:14.3,nt:40.5,bs:48.4,ln:1.4,st:81.8,ia:4.2,dp:"Low",ds:2,ab:"Medium",an:"connectivity and reliability",p65:1508,fsm:2,sen:15.2,dis:3.2,rt:7.4,wa:9033},
{w:"Westbury-on-Trym & Henleaze",pop:20957,tdi:38.7,tp:1.37,te:26.7,td:0,sd:3.34,inc:70000,nc:13.2,gh:87.2,ls:77.3,mw:14.4,sa:80.1,fi:1.5,fc:8.6,lp:8.3,qu:6.9,ag:30,pr:"Stable",cl:"#10B981",cw:26.8,cwk:17.2,dw:44.1,bw:9.9,wcw:26.2,pl:18.6,cs:6.6,nt:47.6,bs:34.9,ln:2.1,st:80.5,ia:5.8,dp:"Low",ds:1,ab:"Low",an:"poor hospital access",p65:4973,fsm:4,sen:11.6,dis:5,rt:15.8,wa:10895},
{w:"Bishopston & Ashley Down",pop:13259,tdi:37.4,tp:1.55,te:46.7,td:0,sd:6.79,inc:62050,nc:18.4,gh:91.6,ls:75.4,mw:11.9,sa:77.9,fi:5.2,fc:8.6,lp:9.1,qu:6,ag:42,pr:"Stable",cl:"#10B981",cw:33,cwk:24.7,dw:35.3,bw:10.5,wcw:38.9,pl:8,cs:8.8,nt:31,bs:50.8,ln:3,st:83.2,ia:3.6,dp:"Low",ds:2,ab:"High",an:"anti-disabled design, long detours",p65:1168,fsm:5.8,sen:15.7,dis:6.5,rt:3.3,wa:9494},
{w:"Ashley",pop:21057,tdi:35.9,tp:1.42,te:80,td:0,sd:4.27,inc:67500,nc:35.3,gh:89.1,ls:62.5,mw:20.6,sa:61.9,fi:7.8,fc:19.3,lp:12.7,qu:8.3,ag:35,pr:"Latent Demand",cl:"#3B82F6",cw:31.1,cwk:22.1,dw:26.4,bw:8.5,wcw:53.5,pl:17.3,cs:11.9,nt:36.4,bs:31.3,ln:2.9,st:75.2,ia:4.7,dp:"Medium-High",ds:4,ab:"Medium",an:"hospital access, poor timing",p65:1214,fsm:26.7,sen:18.3,dis:26,rt:-20.7,wa:15322},
{w:"St George Troopers Hill",pop:6480,tdi:34.7,tp:1.98,te:40,td:0,sd:4.63,inc:48600,nc:14.6,gh:83.8,ls:64.4,mw:23.5,sa:63.8,fi:5.6,fc:14.5,lp:11.3,qu:9.9,ag:38,pr:"Stable",cl:"#10B981",cw:20.1,cwk:13.5,dw:52.1,bw:10.3,wcw:17.4,pl:34.6,cs:18.1,nt:41.9,bs:48.7,ln:4.9,st:65.3,ia:8.9,dp:"Medium",ds:3,ab:"Low",an:"none noted",p65:1116,fsm:20.9,sen:20.1,dis:22.5,rt:-10.7,wa:4137},
{w:"Clifton Down",pop:11638,tdi:29.1,tp:1.54,te:46.7,td:0,sd:8.59,inc:62200,nc:30.9,gh:93.4,ls:80.5,mw:7,sa:83.8,fi:2.9,fc:5.2,lp:5.1,qu:3.8,ag:20,pr:"Stable",cl:"#10B981",cw:32.5,cwk:13.4,dw:26.9,bw:6.1,wcw:55.5,pl:10.4,cs:9.8,nt:31.7,bs:41.7,ln:3,st:76.4,ia:3.1,dp:"Low",ds:2,ab:"Low",an:"none noted",p65:945,fsm:7.2,sen:14.5,dis:8.8,rt:-5.0,wa:9413},
{w:"Clifton",pop:13353,tdi:28.5,tp:1.56,te:46.7,td:0,sd:3,inc:61650,nc:29.5,gh:91.8,ls:67.7,mw:22.3,sa:81.8,fi:4,fc:10.3,lp:5.7,qu:4.1,ag:22,pr:"Stable",cl:"#10B981",cw:22.7,cwk:17.2,dw:29.8,bw:6.5,wcw:53.9,pl:30.7,cs:15.4,nt:45.1,bs:41.1,ln:4.1,st:76.8,ia:3.5,dp:"Low",ds:2,ab:"Low",an:"none noted",p65:1618,fsm:13.5,sen:12.9,dis:16.6,rt:-5.6,wa:9866},
{w:"Cotham",pop:11671,tdi:27.3,tp:1.69,te:46.7,td:0,sd:8.57,inc:56700,nc:28.8,gh:91,ls:69.9,mw:11.5,sa:74.3,fi:3.3,fc:10.3,lp:5.9,qu:4,ag:24,pr:"Stable",cl:"#10B981",cw:30.8,cwk:19.5,dw:28.9,bw:5.7,wcw:51.7,pl:30.6,cs:11.8,nt:43.2,bs:27.8,ln:2.2,st:75.8,ia:3.8,dp:"Low",ds:2,ab:"Low",an:"none noted",p65:929,fsm:6.8,sen:10.3,dis:8.1,rt:-6.8,wa:9388},
{w:"Stoke Bishop",pop:13754,tdi:21.7,tp:1.75,te:20,td:0,sd:2.18,inc:55000,nc:12.8,gh:95.6,ls:80.8,mw:10.3,sa:74.4,fi:1.8,fc:11,lp:5,qu:4.2,ag:20,pr:"Stable",cl:"#10B981",cw:14.7,cwk:9,dw:46.7,bw:7.1,wcw:14.9,pl:12.4,cs:4.4,nt:47.1,bs:37.1,ln:3.8,st:80.8,ia:5.1,dp:"Low",ds:1,ab:"Very Low",an:"none noted",p65:2672,fsm:18.5,sen:15.5,dis:19.8,rt:-1.2,wa:8271},
];

const WARD_DATA = W.map(d => ({
  ward: d.w, population: d.pop, tdi: d.tdi, transportPoverty: d.tp,
  transportExclusion: d.te, transportDesert: d.td, serviceDegree: d.sd,
  income: d.inc, noCar: d.nc, goodHealth: d.gh, lifeSat: d.ls,
  poorMentalWB: d.mw, safeAfterDark: d.sa, foodInsec: d.fi, fearCrime: d.fc,
  lostProductivity: d.lp, qolUplift: d.qu, accessibilityGap: d.ag,
  priority: d.pr, color: d.cl, cycleWeekly: d.cw, cycleWork: d.cwk,
  driveWork: d.dw, busWork: d.bw, walkCycleWork: d.wcw,
  preventedLeaving: d.pl, communityStop: d.cs, nightTransport: d.nt,
  busSatisfied: d.bs, lonely: d.ln, safeTransport: d.st, inactive: d.ia,
  deprivation: d.dp, depScore: d.ds, accBarrier: d.ab, accNotes: d.an,
  pop_65plus: d.p65, fsm: d.fsm, sen: d.sen, disadvantaged: d.dis,
  residualTDI: d.rt, workingAge: d.wa,
}));

const OLS_TP = { gh: -7.671, sa: -24.732, fc: 8.234, mw: 7.345, fi: 6.234 };
const OLS_TE = { gh: -0.02341, sa: -0.08234, fc: 0.15678, mw: 0.05678, fi: 0.08456 };

// Economic impact coefficients (residualised, deprivation-controlled)
// TDI = 11.66 + 11.24*Dep (R²=0.74); Residual TDI → Lost Productivity: β=0.3176, p<0.0001, R²=0.875
// Desert status → Lost Productivity: β=5.26, p=0.04 (N=34, 2 desert wards)
// Walk/Cycle to Work → Lost Productivity: β=-0.0879, p=0.011
const ECON = {
  residTDI_prod: 0.3176,
  desert_prod: 5.26,
  activeTravel_prod: -0.0879,
};

const OUTCOMES = [
  { k: 'gh', label: 'Good Health (%)', dir: 'up', icon: 'Health' },
  { k: 'sa', label: 'Feel Safe After Dark (%)', dir: 'up', icon: 'Safety' },
  { k: 'mw', label: 'Poor Mental Wellbeing (%)', dir: 'down', icon: 'Mental WB' },
  { k: 'fi', label: 'Food Insecurity (%)', dir: 'down', icon: 'Food Insec' },
  { k: 'fc', label: 'Fear of Crime (%)', dir: 'down', icon: 'Crime Fear' },
];

const CORRS = [
  { v: "Transport Poverty to Feel Safe After Dark", r: -0.864, s: "Very Strong" },
  { v: "Transport Poverty to Financial Difficulty", r: 0.810, s: "Very Strong" },
  { v: "Transport Poverty to Good Health", r: -0.790, s: "Strong" },
  { v: "Transport Exclusion to Fear of Crime", r: 0.820, s: "Very Strong" },
  { v: "Transport Exclusion to Prevented Leaving Home", r: 0.790, s: "Strong" },
  { v: "TDI to Lost Productivity", r: 0.770, s: "Strong" },
  { v: "TDI to Good Health", r: -0.790, s: "Strong" },
  { v: "Transport Poverty to Poor Mental Wellbeing", r: 0.590, s: "Moderate" },
  { v: "Transport Desert to Food Insecurity", r: 0.540, s: "Moderate" },
];

const PRIS = [
  { k: 'all', l: 'All Wards', c: '#6B7280' },
  { k: 'Highest Priority', l: 'Highest Priority', c: '#DC2626' },
  { k: 'High-Need', l: 'High Need', c: '#EA580C' },
  { k: 'Moderate Need', l: 'Moderate Need', c: '#F59E0B' },
  { k: 'Latent Demand', l: 'Latent Demand', c: '#3B82F6' },
  { k: 'Stable', l: 'Stable', c: '#10B981' },
];

function TT({ active, payload, render }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-xs">
      {render(payload[0].payload)}
    </div>
  );
}

function MC({ val, lab, bg }) {
  return (
    <div className={"bg-gradient-to-br rounded-xl shadow-sm p-3.5 text-white " + bg}>
      <div className="text-xl font-bold mb-0.5">{val}</div>
      <div className="text-white/75 text-xs">{lab}</div>
    </div>
  );
}

function Hd({ title, sub }) {
  return (
    <div className="mb-1">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

function MS({ l, v }) {
  return (
    <div>
      <div className="text-gray-400 text-xs">{l}</div>
      <div className="font-semibold text-gray-800 text-xs">{v}</div>
    </div>
  );
}

function Def({ title, color, icon, text, stat }) {
  return (
    <div className="rounded-xl border-2 p-4" style={{ borderColor: color + '40' }}>
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-bold text-base mb-1.5" style={{ color }}>{title}</h3>
      <p className="text-xs text-gray-600 leading-relaxed mb-2">{text}</p>
      <div className="text-xs font-semibold bg-gray-50 rounded-lg px-2.5 py-1.5 text-gray-700">{stat}</div>
    </div>
  );
}

function SP({ title, data, xK, yK, xL, yL, c, n }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-900 mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 30, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" dataKey={xK}
            label={{ value: xL, position: 'insideBottom', offset: -10, style: { fontSize: 10 } }} />
          <YAxis type="number" dataKey={yK}
            label={{ value: yL, angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
          <Tooltip formatter={v => v.toFixed(1)} contentStyle={{ borderRadius: '6px', fontSize: 11 }} />
          <Scatter data={data} fill={c} shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 mt-0.5">{n}</p>
    </div>
  );
}

function Sl({ label, val, set, max, c }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input type="range" min={0} max={max} value={val}
          onChange={e => set(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: c }} />
        <span className="text-base font-bold text-gray-900 w-12 text-right">{val}%</span>
      </div>
    </div>
  );
}

const BristolTransportDashboard = () => {
  const [tab, setTab] = useState('overview');
  const [sortBy, setSortBy] = useState('tdi');
  const [prFilter, setPrFilter] = useState('all');
  const [povRed, setPovRed] = useState(15);
  const [exclRed, setExclRed] = useState(15);
  const [projScope, setProjScope] = useState('high');
  const [selWard, setSelWard] = useState(null);
  const [econRed, setEconRed] = useState(15);

  const stats = useMemo(() => {
    const hp = WARD_DATA.filter(w => w.priority.includes('High') || w.priority.includes('Highest')).length;
    const tp = Math.round(WARD_DATA.reduce((s, w) => s + w.population, 0) / 1000);
    return { healthGap: '21.9', highPr: hp, totalPop: tp };
  }, []);

  const sorted = useMemo(() => {
    let f = prFilter === 'all' ? [...WARD_DATA] : WARD_DATA.filter(w => w.priority.startsWith(prFilter));
    return f.sort((a, b) => {
      if (sortBy === 'tdi') return b.tdi - a.tdi;
      if (sortBy === 'health') return a.goodHealth - b.goodHealth;
      if (sortBy === 'productivity') return b.lostProductivity - a.lostProductivity;
      if (sortBy === 'safety') return a.safeAfterDark - b.safeAfterDark;
      if (sortBy === 'cycling') return b.cycleWeekly - a.cycleWeekly;
      return 0;
    });
  }, [sortBy, prFilter]);

  const proj = useMemo(() => {
    const scope = w => {
      if (projScope === 'high') return w.priority.includes('High') || w.priority.includes('Highest');
      if (projScope === 'moderate') return w.priority !== 'Stable' && w.priority !== 'Latent Demand';
      return true;
    };
    const targets = WARD_DATA.filter(scope);
    const wp = targets.map(w => {
      const dp = -w.transportPoverty * (povRed / 100);
      const de = -w.transportExclusion * (exclRed / 100);
      const ch = {};
      OUTCOMES.forEach(o => {
        ch[o.k] = (OLS_TP[o.k] || 0) * dp + (OLS_TE[o.k] || 0) * de;
      });
      return { ...w, changes: ch };
    });
    const tPop = wp.reduce((s, w) => s + w.population, 0);
    const cPop = WARD_DATA.reduce((s, w) => s + w.population, 0);
    const city = {};
    OUTCOMES.forEach(o => {
      city[o.k] = tPop > 0 ? wp.reduce((s, w) => s + w.changes[o.k] * w.population, 0) / cPop : 0;
    });
    return { wp, city, tPop, count: wp.length };
  }, [povRed, exclRed, projScope]);

  const tabList = [
    { id: 'overview', label: 'Overview' },
    { id: 'drivers', label: 'What Drives It' },
    { id: 'travel', label: 'How Bristol Moves' },
    { id: 'who', label: 'Who Bears the Cost' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'projections', label: 'Projections' },
    { id: 'economic', label: 'Economic Impact' },
    { id: 'wards', label: 'Ward Explorer' },
  ];

  const isGood = (dir, v) => (dir === 'up' && v > 0) || (dir === 'down' && v < 0);

  return (
    <div className="w-full min-h-screen bg-slate-50 p-3">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-5 border-l-4 border-blue-600">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Bristol Transport Disadvantage Dashboard
          </h1>
          <p className="text-gray-500 text-sm mb-3">
            Quantifying the health, safety, and economic costs of inadequate transport across 34 wards
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">34 Wards</span>
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">{stats.totalPop}k Residents</span>
            <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-medium">R2 up to 0.88</span>
            <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full font-medium">2 Transport Deserts</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <MC val={stats.healthGap + "pp"} lab="Health gap: best vs worst" bg="from-red-500 to-rose-600" />
          <MC val="-0.86" lab="r: Transport poverty to Unsafe" bg="from-orange-500 to-amber-600" />
          <MC val={String(stats.highPr)} lab="High priority wards" bg="from-blue-500 to-indigo-600" />
          <MC val="28.6%" lab="Peak lost productivity" bg="from-purple-500 to-violet-600" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm mb-5 overflow-hidden">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabList.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={
                  "px-3 py-3.5 text-xs font-semibold whitespace-nowrap transition-colors " +
                  (tab === t.id
                    ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                    : 'text-gray-400 hover:text-gray-700')
                }>
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-4">

            {tab === 'overview' && (
              <div className="space-y-6">
                <Hd title="Transport Disadvantage by Ward"
                  sub="The TDI combines structural inadequacy, affordability barriers, accessibility issues, and perceived exclusion into a single 0 to 100 score." />
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart data={sorted} margin={{ top: 10, right: 15, left: 10, bottom: 90 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="ward" angle={-45} textAnchor="end" height={90} tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={v => [v.toFixed(1), 'TDI']} />
                    <Bar dataKey="tdi" radius={[3, 3, 0, 0]}>
                      {sorted.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <SP title="Health vs Transport Poverty" data={WARD_DATA}
                    xK="transportPoverty" yK="goodHealth"
                    xL="Transport Poverty" yL="% Good Health"
                    c="#3B82F6" n="r = -0.79, p < 0.001" />
                  <SP title="Safety vs Transport Poverty" data={WARD_DATA}
                    xK="transportPoverty" yK="safeAfterDark"
                    xL="Transport Poverty" yL="% Feel Safe After Dark"
                    c="#EF4444" n="r = -0.86, p < 0.001" />
                </div>
              </div>
            )}

            {tab === 'drivers' && (
              <div className="space-y-6">
                <Hd title="Understanding Transport Disadvantage"
                  sub="Three distinct but overlapping concepts describe how transport fails communities." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Def title="Transport Poverty" color="#DC2626" icon="P"
                    text="When people spend a disproportionate share of income on transport, or cannot afford to travel at all. Composite index (0 to 3) combining fare burden, income, car ownership, and service availability."
                    stat={"Range: " + Math.min(...WARD_DATA.map(w => w.transportPoverty)).toFixed(2) + " to " + Math.max(...WARD_DATA.map(w => w.transportPoverty)).toFixed(2)} />
                  <Def title="Transport Exclusion" color="#EA580C" icon="E"
                    text="The extent to which inadequate transport prevents participation in normal social and economic life. Percentage score (0 to 100) capturing barriers to employment, healthcare, education, and community."
                    stat={"Range: " + Math.min(...WARD_DATA.map(w => w.transportExclusion)) + "% to " + Math.max(...WARD_DATA.map(w => w.transportExclusion)) + "%"} />
                  <Def title="Transport Desert" color="#7C3AED" icon="D"
                    text="A ward where high transport poverty combines with poor bus service. Only 2 of 34 wards qualify: Hartcliffe and Withywood (1.55 routes per 10k) and Bishopsworth (1.6 routes per 10k)."
                    stat="2 of 34 wards (5.9%)" />
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Bus Service vs Transport Disadvantage</h3>
                  <p className="text-xs text-gray-500 mb-3">Service degree = bus routes per 10,000 residents</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart margin={{ top: 10, right: 15, bottom: 40, left: 45 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" dataKey="serviceDegree"
                        label={{ value: 'Routes per 10k', position: 'insideBottom', offset: -10, style: { fontSize: 10 } }} />
                      <YAxis type="number" dataKey="tdi"
                        label={{ value: 'TDI (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                      <Tooltip content={({ active, payload }) => (
                        <TT active={active} payload={payload} render={d => (
                          <div><b>{d.ward}</b><br />Service: {d.serviceDegree}/10k | TDI: {d.tdi}%
                            {d.transportDesert ? <span className="text-purple-600 font-bold"> TRANSPORT DESERT</span> : null}
                          </div>
                        )} />
                      )} />
                      <Scatter data={WARD_DATA}>
                        {WARD_DATA.map((e, i) => (
                          <Cell key={i} fill={e.transportDesert ? '#7C3AED' : e.color} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Car Ownership Gap (Top 15 TDI)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={sorted.slice(0, 15)} layout="vertical" margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis type="category" dataKey="ward" width={140} tick={{ fontSize: 9 }} />
                        <Tooltip formatter={v => [v + '%', 'No Car']} />
                        <Bar dataKey="noCar" fill="#6366F1" radius={[0, 3, 3, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Deprivation x Transport Disadvantage</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart margin={{ top: 10, right: 15, bottom: 40, left: 45 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" dataKey="depScore" domain={[0, 6]}
                          label={{ value: 'Deprivation (1=Low, 5=High)', position: 'insideBottom', offset: -10, style: { fontSize: 10 } }} />
                        <YAxis type="number" dataKey="tdi"
                          label={{ value: 'TDI (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                        <Tooltip content={({ active, payload }) => (
                          <TT active={active} payload={payload} render={d => (
                            <div><b>{d.ward}</b><br />Deprivation: {d.deprivation} | TDI: {d.tdi}%</div>
                          )} />
                        )} />
                        <Scatter data={WARD_DATA}>
                          {WARD_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h3 className="font-bold text-amber-900 mb-2 text-sm">Accessibility Barriers from Communities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {WARD_DATA.filter(w => w.accNotes !== 'none noted' && w.accNotes !== 'N').slice(0, 10).map(w => (
                      <div key={w.ward} className="text-xs bg-white rounded-lg p-2.5 border border-amber-100">
                        <span className="font-bold text-gray-900">{w.ward}</span>
                        <span className="text-amber-700 ml-1.5">{w.accNotes}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'travel' && (
              <div className="space-y-6">
                <Hd title="How Bristol Moves"
                  sub="Ward level travel patterns reveal stark divides in active travel, car dependency, and public transport reliance." />
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Travel to Work by Mode (Top 15 by TDI)</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={sorted.slice(0, 15)} margin={{ top: 10, right: 15, left: 5, bottom: 80 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="ward" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="driveWork" stackId="a" fill="#EF4444" name="Drive" />
                      <Bar dataKey="busWork" stackId="a" fill="#F59E0B" name="Bus" />
                      <Bar dataKey="walkCycleWork" stackId="a" fill="#10B981" name="Walk/Cycle" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">Weekly Cycling Rates</h3>
                    <p className="text-xs text-gray-500 mb-3">Easton (50.7%) vs Stockwood (4.6%)</p>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[...WARD_DATA].sort((a, b) => b.cycleWeekly - a.cycleWeekly).slice(0, 12)}
                        layout="vertical" margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis type="category" dataKey="ward" width={140} tick={{ fontSize: 9 }} />
                        <Tooltip formatter={v => [v + '%', 'Cycle Weekly']} />
                        <Bar dataKey="cycleWeekly" fill="#10B981" radius={[0, 3, 3, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">Night Economy Transport Demand</h3>
                    <p className="text-xs text-gray-500 mb-3">% who say better transport would mean more night visits</p>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[...WARD_DATA].sort((a, b) => b.nightTransport - a.nightTransport).slice(0, 12)}
                        layout="vertical" margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis type="category" dataKey="ward" width={140} tick={{ fontSize: 9 }} />
                        <Tooltip formatter={v => [v + '%', 'Would Visit More']} />
                        <Bar dataKey="nightTransport" fill="#8B5CF6" radius={[0, 3, 3, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Bus Satisfaction vs Transport Disadvantage</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <ScatterChart margin={{ top: 10, right: 15, bottom: 40, left: 45 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" dataKey="tdi"
                        label={{ value: 'TDI (%)', position: 'insideBottom', offset: -10, style: { fontSize: 10 } }} />
                      <YAxis type="number" dataKey="busSatisfied"
                        label={{ value: '% Satisfied', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                      <Tooltip content={({ active, payload }) => (
                        <TT active={active} payload={payload} render={d => (
                          <div><b>{d.ward}</b><br />TDI: {d.tdi}% | Bus Sat: {d.busSatisfied}%</div>
                        )} />
                      )} />
                      <Scatter data={WARD_DATA.filter(w => w.busSatisfied > 0)}>
                        {WARD_DATA.filter(w => w.busSatisfied > 0).map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {tab === 'who' && (
              <div className="space-y-6">
                <Hd title="Who Bears the Cost"
                  sub="Transport disadvantage does not fall equally. Age, income, disability, and geography determine who can reach work, a GP, or a friend." />
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">% Prevented from Leaving Home Due to Transport</h3>
                  <p className="text-xs text-gray-500 mb-3">Bristol average: 22.4%. Hengrove reaches 37.8%.</p>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={[...WARD_DATA].filter(w => w.preventedLeaving > 0).sort((a, b) => b.preventedLeaving - a.preventedLeaving)}
                      margin={{ top: 10, right: 15, left: 10, bottom: 90 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="ward" angle={-45} textAnchor="end" height={90} tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip formatter={v => [v + '%', 'Prevented']} />
                      <Bar dataKey="preventedLeaving" radius={[3, 3, 0, 0]}>
                        {[...WARD_DATA].filter(w => w.preventedLeaving > 0).sort((a, b) => b.preventedLeaving - a.preventedLeaving).map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">Elderly (65+) in High Priority Wards</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart
                        data={WARD_DATA.filter(w => w.priority.includes('High') || w.priority.includes('Highest')).sort((a, b) => b.pop_65plus - a.pop_65plus)}
                        layout="vertical" margin={{ top: 5, right: 15, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" tick={{ fontSize: 10 }} />
                        <YAxis type="category" dataKey="ward" width={140} tick={{ fontSize: 9 }} />
                        <Tooltip formatter={v => [v.toLocaleString(), '65+']} />
                        <Bar dataKey="pop_65plus" fill="#8B5CF6" radius={[0, 3, 3, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">Free School Meals x Transport Disadvantage</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <ScatterChart margin={{ top: 10, right: 15, bottom: 40, left: 45 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis type="number" dataKey="tdi"
                          label={{ value: 'TDI (%)', position: 'insideBottom', offset: -10, style: { fontSize: 10 } }} />
                        <YAxis type="number" dataKey="fsm"
                          label={{ value: 'FSM Rate (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                        <Tooltip content={({ active, payload }) => (
                          <TT active={active} payload={payload} render={d => (
                            <div><b>{d.ward}</b><br />TDI: {d.tdi}% | FSM: {d.fsm}%</div>
                          )} />
                        )} />
                        <Scatter data={WARD_DATA}>
                          {WARD_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Community Blocked</h4>
                    <p className="text-xs text-gray-500 mb-2">% for whom transport stops community involvement</p>
                    <div className="text-xs"><span className="text-red-600 font-semibold">Worst: </span>Hartcliffe 18.6%</div>
                    <div className="text-xs"><span className="text-green-600 font-semibold">Best: </span>Stoke Bishop 4.4%</div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Loneliness</h4>
                    <p className="text-xs text-gray-500 mb-2">% lonely because cannot see friends/family</p>
                    <div className="text-xs"><span className="text-red-600 font-semibold">Worst: </span>Hartcliffe 12.1%</div>
                    <div className="text-xs"><span className="text-green-600 font-semibold">Best: </span>Redland 1.4%</div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Safety on Transport</h4>
                    <p className="text-xs text-gray-500 mb-2">% safe from sexual harassment on Bristol transport</p>
                    <div className="text-xs"><span className="text-green-600 font-semibold">Best: </span>Bishopston 83.2%</div>
                    <div className="text-xs"><span className="text-red-600 font-semibold">Worst: </span>Hartcliffe 58.3%</div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'evidence' && (
              <div className="space-y-4">
                <Hd title="Transport Outcome Correlations"
                  sub="All correlations at ward level (N=34). Statistically significant at p < 0.001 unless noted." />
                {CORRS.map((c, i) => (
                  <div key={i} className="bg-white rounded-lg p-3.5 border border-gray-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-sm font-semibold text-gray-800">{c.v}</h3>
                      <span className={
                        "px-2 py-0.5 rounded-full text-xs font-semibold " +
                        (Math.abs(c.r) > 0.8 ? 'bg-red-100 text-red-800' :
                          Math.abs(c.r) > 0.6 ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800')
                      }>{c.s}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-3.5 overflow-hidden">
                        <div
                          className={"h-full rounded-full " + (c.r < 0 ? 'bg-red-500' : 'bg-blue-500')}
                          style={{ width: Math.abs(c.r) * 100 + '%' }} />
                      </div>
                      <div className="text-base font-bold text-gray-900 w-14 text-right font-mono">
                        {c.r.toFixed(3)}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                  <b>Key finding:</b> Transport poverty correlates more strongly with feeling unsafe after dark (r = -0.86) than with any health metric.
                  This suggests transport and safety share deep structural roots in the built environment.
                </div>
              </div>
            )}

            {tab === 'projections' && (
              <div className="space-y-5">
                <Hd title="Interactive Intervention Projections"
                  sub="Adjust sliders to model projected impact. OLS coefficients applied to baseline data; projected associations, not guaranteed causal outcomes." />
                <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Sl label="Transport Poverty Reduction" val={povRed} set={setPovRed} max={30} c="#2563EB" />
                    <Sl label="Transport Exclusion Reduction" val={exclRed} set={setExclRed} max={30} c="#4F46E5" />
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Scope</label>
                      <select value={projScope} onChange={e => setProjScope(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                        <option value="high">Highest + High Need wards</option>
                        <option value="moderate">All disadvantaged wards</option>
                        <option value="all">All 34 wards</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 self-center">Presets:</span>
                    {[['Modest', 10, 10], ['Moderate', 15, 15], ['Ambitious', 25, 20], ['Reset', 0, 0]].map(arr => (
                      <button key={arr[0]}
                        onClick={() => { setPovRed(arr[1]); setExclRed(arr[2]); }}
                        className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100">
                        {arr[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Projected Citywide Impact</h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Population weighted across {proj.count} targeted wards ({Math.round(proj.tPop / 1000)}k residents)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {OUTCOMES.map(o => {
                      const v = proj.city[o.k];
                      const good = isGood(o.dir, v);
                      const neutral = Math.abs(v) < 0.01;
                      return (
                        <div key={o.k} className={
                          "rounded-lg p-3 border " +
                          (neutral ? 'bg-gray-50 border-gray-200' : good ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200')
                        }>
                          <div className={
                            "text-xl font-bold " +
                            (neutral ? 'text-gray-400' : good ? 'text-emerald-700' : 'text-red-700')
                          }>
                            {v > 0 ? '+' : ''}{v.toFixed(2)}pp
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5">{o.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">Ward Level Projected Changes</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left px-3 py-2.5 font-semibold">Ward</th>
                          <th className="text-right px-2 py-2.5 font-semibold">TDI</th>
                          {OUTCOMES.map(o => (
                            <th key={o.k} className="text-right px-2 py-2.5 font-semibold whitespace-nowrap text-xs">{o.icon}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {proj.wp.sort((a, b) => b.tdi - a.tdi).map((w, i) => (
                          <tr key={w.ward} className={i % 2 === 0 ? '' : 'bg-slate-50'}>
                            <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{w.ward}</td>
                            <td className="text-right px-2 py-2 font-mono text-gray-700">{w.tdi.toFixed(1)}</td>
                            {OUTCOMES.map(o => {
                              const v = w.changes[o.k];
                              const good = isGood(o.dir, v);
                              return (
                                <td key={o.k} className={
                                  "text-right px-2 py-2 font-mono " +
                                  (good ? 'text-emerald-700' : 'text-red-600')
                                }>
                                  {v > 0 ? '+' : ''}{v.toFixed(2)}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                  <b>Methodology:</b> OLS coefficients (N=34, controls: IMD deprivation, population density) applied to hypothetical reductions.
                  R2 0.61 to 0.82. Projected associations supported by community evidence, not confirmed causal effects.
                </div>
              </div>
            )}

            {tab === 'economic' && (
              <div className="space-y-5">
                <Hd title="Economic Impact of Transport Disadvantage"
                  sub="To isolate transport's independent economic effect, we removed the component of transport disadvantage explained by deprivation (IMD). The residual captures pure transport disadvantage: infrastructure, access, and service provision, not poverty." />

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="font-bold text-blue-900 text-sm mb-2">Why residualisation matters</h3>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Transport disadvantage (TDI) correlates heavily with deprivation (R² = 0.74). Without separating them, any
                    economic projection would conflate poverty costs with transport costs. By residualising, we extract the
                    transport-specific component and test whether it independently predicts lost productivity. It does:
                    β = 0.32, p &lt; 0.0001, R² = 0.875. This is the strongest model in the entire study.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 space-y-4 border border-slate-200">
                  <Sl label="Reduce Pure Transport Disadvantage by" val={econRed} set={setEconRed} max={30} c="#2563EB" />
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500 self-center">Presets:</span>
                    {[['Modest', 10], ['Moderate', 15], ['Ambitious', 25], ['Reset', 0]].map(arr => (
                      <button key={arr[0]} onClick={() => setEconRed(arr[1])}
                        className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100">
                        {arr[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Projected Productivity Gains by Ward</h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Estimated annual economic impact = productivity change x working age population x mean ward income
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left px-3 py-2.5 font-semibold">Ward</th>
                          <th className="text-right px-2 py-2.5 font-semibold">Residual TDI</th>
                          <th className="text-right px-2 py-2.5 font-semibold">Prod. Change</th>
                          <th className="text-right px-2 py-2.5 font-semibold">Est. Annual £</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...WARD_DATA].filter(w => w.residualTDI > 0).sort((a, b) => b.residualTDI - a.residualTDI).map((w, i) => {
                          const drt = w.residualTDI * (econRed / 100);
                          const dprod = ECON.residTDI_prod * drt;
                          const annual = Math.abs(dprod / 100) * w.workingAge * w.income;
                          return (
                            <tr key={w.ward} className={i % 2 === 0 ? '' : 'bg-slate-50'}>
                              <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">{w.ward}</td>
                              <td className="text-right px-2 py-2 font-mono text-gray-700">{w.residualTDI.toFixed(1)}</td>
                              <td className="text-right px-2 py-2 font-mono text-emerald-700">{dprod > 0 ? '+' : ''}{dprod.toFixed(2)}pp</td>
                              <td className="text-right px-2 py-2 font-mono text-emerald-700">
                                £{Math.round(annual).toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="border-t-2 border-gray-300">
                        <tr className="font-bold">
                          <td className="px-3 py-2.5" colSpan={3}>TOTAL (wards with positive residual TDI)</td>
                          <td className="text-right px-2 py-2.5 font-mono text-emerald-700">
                            £{Math.round(WARD_DATA.filter(w => w.residualTDI > 0).reduce((s, w) => {
                              const drt = w.residualTDI * (econRed / 100);
                              return s + Math.abs(ECON.residTDI_prod * drt / 100) * w.workingAge * w.income;
                            }, 0)).toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Only wards where transport disadvantage exceeds what deprivation alone predicts (positive residual TDI).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                    <h3 className="font-bold text-red-900 text-base mb-2">Transport Deserts: The Infrastructure Gap</h3>
                    <p className="text-xs text-red-800 mb-3">
                      Bristol has 2 transport deserts where bus service is critically absent. Desert status independently adds
                      5.26pp to lost productivity after controlling for deprivation (p = 0.04).
                    </p>
                    <div className="space-y-3">
                      {WARD_DATA.filter(w => w.transportDesert === 1).map(w => {
                        const cost = (ECON.desert_prod / 100) * w.workingAge * w.income;
                        return (
                          <div key={w.ward} className="bg-white rounded-lg p-3">
                            <div className="font-bold text-gray-900 text-sm">{w.ward}</div>
                            <div className="text-xs text-gray-600">
                              Service: {w.serviceDegree} routes/10k (city avg: 5.2)
                            </div>
                            <div className="text-xs text-gray-600">
                              Working age: {w.workingAge.toLocaleString()} | Income: £{w.income.toLocaleString()}
                            </div>
                            <div className="text-sm font-bold text-red-700 mt-1">
                              Annual desert cost: £{Math.round(cost).toLocaleString()}
                            </div>
                          </div>
                        );
                      })}
                      <div className="bg-white rounded-lg p-3 border-t-2 border-red-300">
                        <div className="text-sm font-bold text-red-900">
                          Combined desert cost: £{Math.round(
                            WARD_DATA.filter(w => w.transportDesert === 1)
                              .reduce((s, w) => s + (ECON.desert_prod / 100) * w.workingAge * w.income, 0)
                          ).toLocaleString()}/year
                        </div>
                        <div className="text-xs text-red-700 mt-1">
                          Eliminating desert status requires raising service from ~1.6 to ~5.2 routes per 10,000 residents
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5">
                    <h3 className="font-bold text-emerald-900 text-base mb-2">Active Travel Dividend</h3>
                    <p className="text-xs text-emerald-800 mb-3">
                      Each additional percentage point of walk/cycle to work rate is associated with 0.088pp lower lost
                      productivity (β = -0.088, p = 0.011), controlling for deprivation.
                    </p>
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-red-700 mb-1">Lowest active travel (highest productivity loss):</div>
                      {[...WARD_DATA].sort((a, b) => a.walkCycleWork - b.walkCycleWork).filter(w => w.walkCycleWork > 0).slice(0, 3).map(w => (
                        <div key={w.ward} className="bg-white rounded-lg p-2.5 flex justify-between items-center">
                          <div>
                            <div className="font-bold text-gray-900 text-xs">{w.ward}</div>
                            <div className="text-xs text-gray-500">{w.walkCycleWork}% walk/cycle</div>
                          </div>
                          <div className="text-xs font-bold text-red-600">{w.lostProductivity}% lost prod.</div>
                        </div>
                      ))}
                      <div className="text-xs font-semibold text-emerald-700 mt-2 mb-1">Highest active travel (lowest productivity loss):</div>
                      {[...WARD_DATA].sort((a, b) => b.walkCycleWork - a.walkCycleWork).filter(w => w.walkCycleWork > 0).slice(0, 3).map(w => (
                        <div key={w.ward} className="bg-white rounded-lg p-2.5 flex justify-between items-center">
                          <div>
                            <div className="font-bold text-gray-900 text-xs">{w.ward}</div>
                            <div className="text-xs text-gray-500">{w.walkCycleWork}% walk/cycle</div>
                          </div>
                          <div className="text-xs font-bold text-emerald-600">{w.lostProductivity}% lost prod.</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
                  <b>Methodology:</b> Residualised TDI obtained by regressing TDI on IMD deprivation score (R² = 0.74),
                  then using the residual as a predictor of lost productivity. This isolates transport-specific disadvantage
                  from general poverty. Desert effect from OLS with binary desert status controlling for deprivation
                  (N=34, 2 desert wards). Active travel coefficient from OLS controlling for deprivation.
                  All estimates are cross-sectional associations.
                </div>
              </div>
            )}

            {tab === 'wards' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h2 className="text-lg font-bold text-gray-900">Ward Explorer</h2>
                  <div className="flex gap-2">
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                      className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium bg-white">
                      <option value="tdi">Sort: TDI</option>
                      <option value="health">Sort: Health</option>
                      <option value="productivity">Sort: Productivity</option>
                      <option value="safety">Sort: Safety</option>
                      <option value="cycling">Sort: Cycling</option>
                    </select>
                    <select value={prFilter} onChange={e => setPrFilter(e.target.value)}
                      className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium bg-white">
                      {PRIS.map(p => <option key={p.k} value={p.k}>{p.l}</option>)}
                    </select>
                  </div>
                </div>

                {selWard && (
                  <div className="bg-white rounded-xl border-2 border-blue-300 p-5 mb-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{selWard.ward}</h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: selWard.color + '15', color: selWard.color }}>
                          {selWard.priority}
                        </span>
                      </div>
                      <button onClick={() => setSelWard(null)} className="text-gray-400 hover:text-gray-700 text-sm">Close</button>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                      <MS l="TDI" v={selWard.tdi + '%'} />
                      <MS l="Transport Poverty" v={selWard.transportPoverty.toFixed(2)} />
                      <MS l="Exclusion" v={selWard.transportExclusion + '%'} />
                      <MS l="Good Health" v={selWard.goodHealth + '%'} />
                      <MS l="Safe After Dark" v={selWard.safeAfterDark + '%'} />
                      <MS l="Lost Productivity" v={selWard.lostProductivity + '%'} />
                      <MS l="Cycle Weekly" v={selWard.cycleWeekly + '%'} />
                      <MS l="Drive to Work" v={selWard.driveWork + '%'} />
                      <MS l="Walk/Cycle Work" v={selWard.walkCycleWork + '%'} />
                      <MS l="Bus Satisfied" v={selWard.busSatisfied + '%'} />
                      <MS l="Prevented Leaving" v={selWard.preventedLeaving + '%'} />
                      <MS l="Night Economy" v={selWard.nightTransport + '%'} />
                      <MS l="Food Insecurity" v={selWard.foodInsec + '%'} />
                      <MS l="Fear Crime" v={selWard.fearCrime + '%'} />
                      <MS l="Lonely" v={selWard.lonely + '%'} />
                      <MS l="Service Degree" v={selWard.serviceDegree + '/10k'} />
                      <MS l="% No Car" v={selWard.noCar + '%'} />
                      <MS l="Deprivation" v={selWard.deprivation} />
                      <MS l="FSM Rate" v={selWard.fsm + '%'} />
                      <MS l="65+ Population" v={selWard.pop_65plus.toLocaleString()} />
                      <MS l="Income" v={'GBP ' + selWard.income.toLocaleString()} />
                      <MS l="Population" v={selWard.population.toLocaleString()} />
                    </div>
                    {selWard.accNotes !== 'none noted' && selWard.accNotes !== 'N' && (
                      <div className="mt-3 bg-amber-50 rounded-lg p-2.5 text-xs text-amber-800">
                        <b>Accessibility barriers:</b> {selWard.accNotes}
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sorted.map(w => (
                    <div key={w.ward} onClick={() => setSelWard(w)}
                      className="bg-white rounded-lg p-3.5 border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{w.ward}</h4>
                          <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: w.color + '12', color: w.color }}>
                            {w.priority.replace('High-Need', 'High Need')}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold" style={{ color: w.color }}>{w.tdi.toFixed(1)}</div>
                          <div className="text-xs text-gray-400">TDI</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 mt-2 text-xs">
                        <MS l="Health" v={w.goodHealth + '%'} />
                        <MS l="Safe" v={w.safeAfterDark + '%'} />
                        <MS l="Prod.Loss" v={w.lostProductivity + '%'} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4 mt-4">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Priority Investment Matrix</h3>
                  <ResponsiveContainer width="100%" height={320}>
                    <ScatterChart margin={{ top: 10, right: 15, bottom: 45, left: 45 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" dataKey="tdi" domain={[0, 100]}
                        label={{ value: 'Transport Disadvantage Index', position: 'insideBottom', offset: -10, style: { fontSize: 10 } }} />
                      <YAxis type="number" dataKey="qolUplift"
                        label={{ value: 'QoL Uplift Potential (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }} />
                      <Tooltip content={({ active, payload }) => (
                        <TT active={active} payload={payload} render={d => (
                          <div><b>{d.ward}</b><br />TDI: {d.tdi} | QoL: {d.qolUplift}% | {d.priority}</div>
                        )} />
                      )} />
                      <Scatter data={WARD_DATA}>
                        {WARD_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-3 justify-center mt-2 text-xs">
                    {PRIS.filter(p => p.k !== 'all').map(p => (
                      <div key={p.k} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.c }} />
                        <span className="text-gray-500">{p.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="bg-gray-800 text-gray-300 rounded-xl p-4 text-center text-xs mt-4">
          <p className="mb-1">
            <b>Data:</b> Bristol Transport Project 2025. Ward level analysis combining transport metrics,
            Quality of Life Survey 2023/24, Census 2021, Crime and Health, and Education datasets.
          </p>
          <p className="text-gray-500">
            All correlations statistically significant. Policy projections use OLS regression coefficients. University of Bristol.
          </p>
        </div>

      </div>
    </div>
  );
};

export default BristolTransportDashboard;

