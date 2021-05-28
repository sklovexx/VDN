
export default class ObjectPool {
    private static instance: ObjectPool = null;
    public static getInstance() {
        if (ObjectPool.instance == null) {
            ObjectPool.instance = new ObjectPool();
        }
        return ObjectPool.instance;
    }

    private nodeMap: Map<string, cc.NodePool> = new Map;
    private prefabMap: Map<string, cc.Prefab> = new Map;

    //添加预制体到map中
    addPrefabPool(prefab: cc.Prefab) {
        if (!prefab) return false
        this.prefabMap.set(prefab.name, prefab);
        return true
    }

    //获取节点
    get(nodeName: string) {
        let nodePool = this.nodeMap.get(nodeName);
        if (nodePool && nodePool.size() > 0) {
            let node = nodePool.get();
            return node;
        }
        else {
            let prefab = this.prefabMap.get(nodeName);
            return cc.instantiate(prefab);
        }
    }

    //存放节点
    put(node: cc.Node) {
        let nodePool = this.nodeMap.get(node.name);
        if (!nodePool) {
            nodePool = new cc.NodePool();
            this.nodeMap.set(node.name, nodePool);
        }
        nodePool.put(node);
    }

    //清理对象池内指定对象
    clearNode(nodeName: string) {
        var nodePool = this.nodeMap.get(nodeName);
        var prefab = this.prefabMap.get(nodeName);
        if (!nodePool || !prefab) {
            console.debug("clearNode error, (nodePool || prefab) = null");
            return;
        }
        this.nodeMap.delete(nodeName);
        this.prefabMap.delete(nodeName);
        nodePool.clear();
        prefab.destroy();
    }

    //清理所有对象
    clearPoolMap() {
        var nm = this.nodeMap;
        var pm = this.prefabMap;
        nm.forEach(function (value) {
            value.clear();
        });
        pm.forEach(function (value) { value.destroy(); });
        nm.clear();
        pm.clear();
    }

}
