# regression: a lesson must not close on Backspace/Escape-less typing while answering (focus on button/body). usage: python3 tools/test-lesson-stay.py (serves v2/ itself)
import subprocess,sys,time,os
from playwright.sync_api import sync_playwright
d=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','v2')
sv=subprocess.Popen([sys.executable,'-m','http.server','8771'],cwd=d,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
bad=0
try:
  with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1100,'height':800});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8771/index.html');pg.wait_for_timeout(800)
    for sid,lid in pg.evaluate("Lumio.subjects.flatMap(s=>s.lessons.filter(l=>l.mod).map(l=>[s.id,l.id]))"):
      pg.evaluate("a=>Lumio.go('planet',a[0],a[1])",[sid,lid]);pg.wait_for_timeout(900)
      for i in range(6):
        if pg.query_selector('#ans-in'):
          pg.fill('#ans-in','999' if i%2 else '0');pg.click('.btn-check')
        else:
          bt=pg.query_selector_all('#lesson button:not(.btn-primary)')
          if bt:bt[i%len(bt)].click()
        pg.keyboard.press('Backspace');pg.keyboard.press('Backspace');pg.wait_for_timeout(1300 if pg.query_selector('#ans-in') else 100)
        if pg.evaluate("Lumio.state.level")!='planet' or not pg.evaluate("document.getElementById('lesson').classList.contains('on')"):
          print('FAIL',sid,lid,'step',i);bad+=1;break
      else:print('ok',sid,lid)
    print('errors',errs);bad+=len(errs)
finally:sv.kill()
sys.exit(1 if bad else 0)
