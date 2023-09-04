interface FamilyMember {
 
  name: string;
  gender: string;
  spouse: string | null;
  children: FamilyMember[];
}
  
  // Define the type for the entire family tree
  interface FamilyTreeData {
    [key: string]: FamilyMember;
  }