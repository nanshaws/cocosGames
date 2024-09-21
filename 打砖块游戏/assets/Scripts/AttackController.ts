import { _decorator, Component, EventTouch, input,Input,instantiate,Node, Prefab, RigidBody, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AttackController')
export class AttackController extends Component {


    @property(Prefab)
    public bulletPrefab:Prefab=null;

    @property
    public bulletSpeed:number=40

    @property
    public fireRate:number=0.3;

    @property(Node)
    public bulletParent:Node=null;
    private fireTimer=0;

    private isTouching:boolean=false;
    start() {
        input.on(Input.EventType.TOUCH_START,this.onTouchStart,this);

        input.on(Input.EventType.TOUCH_END,this.onTouchEnd,this);
    }

    onTouchStart(event:EventTouch){
      
       this.isTouching=true;
     }

     onTouchEnd(event:EventTouch){
        this.isTouching=false;
      }

    update(deltaTime: number) {
        if(this.isTouching){
            this.fireTimer+=deltaTime;
            if(this.fireTimer>this.fireRate){
               this.fire();
               this.fireTimer=0;
            }
        }
    }

    fire(){
        const bullet= instantiate(this.bulletPrefab);
        bullet.setParent(this.bulletParent);
        //bullet.setPosition(0,0,0)
        bullet.setWorldPosition(this.node.position)
        const rgd= bullet.getComponent(RigidBody)
        rgd.setLinearVelocity(new Vec3(0,0,-this.bulletSpeed));
    }
}


