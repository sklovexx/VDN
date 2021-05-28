/**士兵属性 */
export interface SoliderObj {
    solider_id: number
    model_id: number
    level: number,
    hp: number,
    attack: number,
    speed: number,
    atk_dis: number,
    atk_speed: number,
    probability: string,
    increase: string
}

/**士兵状态 */
export enum SoliderState {
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
