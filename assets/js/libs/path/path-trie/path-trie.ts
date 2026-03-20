type TrieNode = {
    children: Map<string, TrieNode>;
    isEnd: boolean;
};

export class PathTrie {

    private root: TrieNode = {
        children: new Map(),
        isEnd: false
    };

    insert(path: string) {

        const parts = path.split('.');
        let node = this.root;

        for (const part of parts) {

            if (!node.children.has(part)) {
                node.children.set(part, {
                    children: new Map(),
                    isEnd: false
                });
            }

            node = node.children.get(part)!;
        }

        node.isEnd = true;
    }

    exists(path: string): boolean {

        const parts = path.split('.');
        let node = this.root;

        for (const part of parts) {

            const next = node.children.get(part);
            if (!next) return false;

            node = next;
        }

        return node.isEnd;
    }

    getNextSegments(path: string | null): string[] {

        let node = this.root;

        if (path) {
            const parts = path.split('.');

            for (const part of parts) {

                const next = node.children.get(part);
                if (!next) return [];

                node = next;
            }
        }

        return [...node.children.keys()];
    }

}
