const artists=[['STARSHIP','IVE'],['STARSHIP','MONSTA X'],['JYP','Stray Kids'],['JYP','TWICE'],['SM','aespa'],['SM','NCT'],['YG','TREASURE'],['YG','BABYMONSTER']];
const themes=['MIDNIGHT','FROST','DREAM','NEON'];const colors=[['#542464','#e45b89'],['#124b73','#59c8dd'],['#4e245f','#8b73f4'],['#184b4e','#54c4a8'],['#803b43','#ff9d77'],['#27356d','#9c8de9'],['#584025','#efc575'],['#3f2858','#d287df']];
const cards=artists.flatMap(([agency,artist],i)=>themes.map((theme,j)=>({id:i*4+j+1,agency,artist,theme,grade:['A','B','R','B'][j],type:j%2?'랜덤 판매 B종':'확정 판매 A종',a:colors[i][0],b:colors[(i+j)%8][1]})));
const $=id=>document.getElementById(id);let wishes=new Set(JSON.parse(localStorage.getItem('staring_wishes')||'[]'));let ranks=JSON.parse(localStorage.getItem('staring_ranks')||'{}');let onlyWish=false;let game=null;
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function art(c){return `<div class="art" style="--a:${c.a};--b:${c.b}"><div class="art-inner"><small>STAR+ING 2026</small><b>${safe(c.artist)}</b><span>${safe(c.theme)}</span><small>✦ ${c.grade} CARD ✦</small></div></div>`}
function toast(t){$('toast').textContent=t;$('toast').style.display='block';setTimeout(()=>$('toast').style.display='none',2800)}
function fillSelect(id,values,placeholder){const e=$(id),v=e.value;e.innerHTML=`<option value="">${placeholder}</option>`+values.map(x=>`<option value="${safe(x)}">${safe(x)}</option>`).join('');e.value=values.includes(v)?v:''}
function updateArtist(agencyId,artistId){fillSelect(artistId,[...new Set(cards.filter(c=>!$(agencyId).value||c.agency===$(agencyId).value).map(c=>c.artist))],'전체 아티스트')}
function share(text,url){if(navigator.share){navigator.share({title:'STAR+ING',text,url}).catch(()=>{})}else if(navigator.clipboard&&location.protocol!=='file:'){navigator.clipboard.writeText(url).then(()=>toast('공유 링크를 복사했습니다.')).catch(()=>prompt('공유 링크 복사',url))}else prompt('공유 링크 복사',url)}
function tick(){let d=new Date('2026-12-18T11:00:00+09:00')-new Date();d=Math.max(0,d);let parts=[Math.floor(d/86400000),Math.floor(d/3600000)%24,Math.floor(d/60000)%60,Math.floor(d/1000)%60];$('countdown').innerHTML=parts.map((v,i)=>`<div><strong>${String(v).padStart(2,'0')}</strong><small>${['DAYS','HOURS','MIN','SEC'][i]}</small></div>`).join('')}
if($('countdown')){tick();setInterval(tick,1000)}

// Highlight current menu (including related subpages).
(()=>{const file=location.pathname.split('/').pop()||'index.html';const group={'collection.html':'events.html','guide.html':'about.html','notice.html':'about.html'};document.querySelectorAll('.nav-items a').forEach(a=>a.classList.toggle('current',a.dataset.page===(group[file]||file)));})();
