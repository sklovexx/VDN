/**士兵属性 */
export interface EnemyObj {
    enemy_id: number
    model_id: number
    hp: number,
    attackValue: number,
    attack_type:number,
    speed: number,
    atk_dis: number,
    atk_speed: number,
}

/**士兵状态 */
export enum EnemyState {
    /**暂停(受buff影响) */
    Pause,
    /**静止(不受buff影响) */
    Static,
    /**待机 */
    Stand,
    /**移动 */
    Run,
    /**寻找攻击位置 */
    SeekAttackPos,
    /**攻击 */
    Attack,
    /**施法 */
    Cast,
    /**死亡 */
    Death,
    /**受击 */
    Break,
}
