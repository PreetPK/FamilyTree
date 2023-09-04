class FamilyMember {
  name: string;
  gender: string;
  spouse: string | null;
  children: FamilyMember[];

  constructor(
    name: string,
    gender: string,
    spouse: string | null = null,
    children: FamilyMember[] = []
  ) {
    this.name = name;
    this.gender = gender;
    this.spouse = spouse;
    this.children = children;
  }

  addChild(child: FamilyMember) {
    this.children.push(child);
  }
}

export default FamilyMember;
