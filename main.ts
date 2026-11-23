import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const Y=new Array(84).fill(0);Y[1]=1;Y[2]=4;Y[48]=Y[49]=Y[50]=Y[51]=2;
const P=new Array(84).fill(2);P[0]=P[1]=P[2]=P[48]=P[51]=P[52]=P[82]=0;P[3]=P[4]=P[23]=P[27]=P[49]=P[50]=P[64]=P[80]=P[81]=P[83]=1;P[7]=3;
const U=new Array(84).fill(1);U[0]=U[3]=U[48]=U[49]=U[50]=U[51]=U[52]=U[65]=U[80]=U[81]=U[83]=0;U[4]=U[5]=2;U[6]=U[7]=3;
const E=new TextEncoder();
function run(p,q){
 const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
 let s=0,c=0,l=0,g=0,pc=0,t=0;
 const F=x=>({o:O.slice(0,l),c:x});
 for(;;){
  if(t==1e6)return F(10);
  if(pc<0||pc>=n)return F(9);
  const op=p[pc];
  if(op>83||op>7&&op<16||op==31||op>34&&op<48||op>52&&op<64||op>65&&op<80)return F(5);
  const m=Y[op];
  if(pc+m>=n)return F(9);
  t++;
  const nx=pc+1+m;
  if(s<P[op])return F(2);
  if(s-P[op]+U[op]>256)return F(3);
  pc=nx;
  if(op>47&&op<51){
   const v=op==48?0:D[--s],r=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
   if(op==48||(op==49)==(v==0))pc=nx+r;
   continue;
  }
  if(op>15&&op<35&&op!=23&&op!=27){
   const b=D[s-1],a=D[s-2];
   if(op>18&&op<23&&!b)return F(4);
   const r=op==16?(a+b)|0:op==17?(a-b)|0:op==18?Math.imul(a,b):op==19?(a/b)|0:op==20?a%b|0:op==21?Math.floor((a>>>0)/(b>>>0))|0:op==22?(a>>>0)%(b>>>0)|0:op==24?a&b:op==25?a|b:op==26?a^b:op==28?a<<(b&31):op==29?a>>(b&31):op==30?(a>>>(b&31))|0:op==32?a==b?1:0:op==33?a<b?1:0:a>>>0<b>>>0?1:0;
   s-=2;D[s++]=r;
   continue;
  }
  switch(op){
   case 0:return F(0);
   case 1:D[s++]=(p[nx-1]<<24)>>24;break;
   case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const w=D[s-1];D[s-1]=D[s-2];D[s-2]=w;break;}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const w=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=w;break;}
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 51:if(c==64)return F(7);C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
   case 52:if(!c)return F(8);pc=C[--c];break;
   case 64:{const a=D[s-1];if(a<0||a>255)return F(6);D[s-1]=M[a];break;}
   case 65:{const a=D[s-1];if(a<0||a>255)return F(6);s-=2;M[a]=D[s];break;}
   case 80:{const b=E.encode(String(D[s-1]));if(l+b.length>65536)return F(11);s--;O.set(b,l);l+=b.length;break;}
   case 81:if(l+1>65536)return F(11);O[l++]=D[--s]&255;break;
   case 82:D[s++]=g<q.length?q[g++]:-1;break;
   case 83:return F(D[--s]&255);
  }
 }
}
const A=process.env.MAKEFUN_INPUT_DIR??"/input",B=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const id of readdirSync(A).sort()){
 const r=run(readFileSync(join(A,id,"program.bin")),readFileSync(join(A,id,"input.bin")));
 mkdirSync(join(B,id),{recursive:true});
 writeFileSync(join(B,id,"stdout.bin"),r.o);
 writeFileSync(join(B,id,"exit.txt"),r.c+"\n");
}
