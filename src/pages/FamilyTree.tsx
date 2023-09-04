import FamilyMember from "./FamilyMember";
class FamilyTree {
  root: FamilyMember | null;

  constructor(root: FamilyMember | null) {
    this.root = root;
  }
}

export default FamilyTree;
