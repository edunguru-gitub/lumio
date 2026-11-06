import sys
def L(h):
    h=h.lstrip('#');c=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    c=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in c];return .2126*c[0]+.7152*c[1]+.0722*c[2]
def cr(a,b):
    x,y=sorted([L(a),L(b)],reverse=True);return (x+.05)/(y+.05)
if __name__=='__main__':
    bgs=sys.argv[1].split(',')
    for f in sys.argv[2:]:
        print(f, ' '.join('%s:%.2f'%(b,cr(f,b)) for b in bgs))
