import { loadInputData } from "../loadInputData.ts";

const input = await loadInputData("07");

class File {
  constructor(public name: string, public size: number) {}
}

class Directory {
  public files: File[] = [];
  public directories: Directory[] = [];

  constructor(public name: string, public parent?: Directory) {}

  public addFile(file: File) {
    this.files.push(file);
  }

  public addDirectory(dir: Directory) {
    this.directories.push(dir);
  }

  public assignParent(dir: Directory) {
    this.parent = dir;
  }

  public openDir(dirName: string) {
    if (dirName === "..") {
      if (!this.parent) {
        throw new Error(`Parent for "${this.name}" not found`);
      }
      return this.parent;
    }
    const dir = this.directories.find((dir) => dir.name === dirName);

    if (!dir) {
      throw new Error(`Child dir "${dirName}" not found in "${this.name}"`);
    }

    return dir;
  }

  public getTotalSize(): number {
    const filesTotal = this.files.reduce((acc, curr) => (acc += curr.size), 0);
    const foldersTotal = this.directories.reduce(
      (acc, curr) => (acc += curr.getTotalSize()),
      0
    );
    return filesTotal + foldersTotal;
  }
}

const getCommand = (input: string) => input.replace("$ ", "").split(" ");

const getContentInfo = (input: string): Directory | File => {
  if (input.startsWith("dir")) {
    return new Directory(input.replace("dir ", ""));
  }
  const [size, name] = input.split(" ");
  return new File(name, Number(size));
};

export const getSolution = (input: string[]) => {
  const root = new Directory("/");
  const allDirs: Directory[] = [];
  let currentDirectory: Directory = root;

  let contentWillFollow = false;

  for (const line of input) {
    if (line.startsWith("$")) {
      contentWillFollow = false;
      const [command, args] = getCommand(line);

      switch (command) {
        case "cd": {
          if (args === "/") {
            currentDirectory = root;
          } else {
            currentDirectory = currentDirectory.openDir(args);
          }

          break;
        }
        case "ls": {
          contentWillFollow = true;
          break;
        }

        default:
          break;
      }
    } else if (contentWillFollow) {
      const content = getContentInfo(line);
      if (content instanceof File) {
        currentDirectory.addFile(content);
      } else {
        content.assignParent(currentDirectory);
        currentDirectory.addDirectory(content);
        allDirs.push(content);
      }
    }
  }

  const sortedBySize = allDirs.sort(
    (a, b) => a.getTotalSize() - b.getTotalSize()
  );

  const needToFreeUp = 70000000 - root.getTotalSize() - 30000000;
  for (const dir of sortedBySize) {
    if (dir.getTotalSize() >= Math.abs(needToFreeUp)) {
      return dir.getTotalSize();
    }
  }

  return needToFreeUp;
};

console.log(getSolution(input));
