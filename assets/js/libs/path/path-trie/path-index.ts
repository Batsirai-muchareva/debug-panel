import { PathTrie } from "./path-trie";

class PathIndex {

    private trie = new PathTrie();

    init(paths: string[]) {

        for (const path of paths) {
            this.trie.insert(path);
        }
    }

    exists(path: string) {
        return this.trie.exists(path);
    }

    nextSegments(path: string | null) {
        return this.trie.getNextSegments(path);
    }

}

export const pathIndex22 = new PathIndex();
