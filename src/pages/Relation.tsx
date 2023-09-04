import React from "react";

type RelationshipProps = {
  treeData: FamilyTreeData;
  personName: string;
  relativeName: string;
};

const FindRelationship: React.FC<RelationshipProps> = ({
  treeData,
  relativeName,
}) => {
  const findRelationship = (
    familyTree: FamilyTreeData,
    personName: string,
    relationship: string
  ): string | null => {
    const findUncles = (person: FamilyMember): string[] => {
      const uncles: string[] = [];

      // Find the person's father
      console.log(person);
      const father = familyTree.kingShan.children.find(
        (child) => child.name === person.name
      );
      console.log(father);
      // Check if the father has siblings (brothers)
      if (father) {
        const fatherSiblings = familyTree.kingShan.children.filter(
          (child) => child.name !== father.name && child.gender === "male"
        );
        uncles.push(...fatherSiblings.map((uncle) => uncle.name));
      }

      return uncles;
    };

    const findMotherInLaw = (person: FamilyMember): string | null => {
      const spouse = person.spouse;
      if (!spouse) {
        return null; // No spouse, so no mother-in-law
      }

      // Find the spouse's mother
      const spouseMother = familyTree.kingShan.children.find(
        (child) => child.name === spouse && child.gender === "female"
      );

      return spouseMother ? spouseMother.name : null;
    };

    const findFatherInLaw = (person: FamilyMember): string | null => {
      const spouse = person.spouse;
      if (!spouse) {
        return null; // No spouse, so no father-in-law
      }

      // Find the spouse's father
      const spouseFather = familyTree.kingShan.children.find(
        (child) => child.name === spouse && child.gender === "male"
      );

      return spouseFather ? spouseFather.name : null;
    };

    const person = familyTree.kingShan.children.find(
      (child) => child.name === personName
    );

    if (!person) {
      return null; // Person not found in the family tree
    }

    switch (relationship) {
      case "Paternal Uncle":
        const uncles = findUncles(person);
        return uncles.length > 0 ? uncles.join(", ") : "No Paternal Uncles";

      case "Mother-in-law":
        const motherInLaw = findMotherInLaw(person);
        return motherInLaw ? motherInLaw : "No Mother-in-law";

      case "Father-in-law":
        const fatherInLaw = findFatherInLaw(person);
        return fatherInLaw ? fatherInLaw : "No Father-in-law";

      default:
        return null; // Invalid relationship
    }
  };

  const personName = "Kriya";
  const relationship = "Mother-in-law"; // Change this to 'Mother-in-law' or 'Father-in-law' as needed
  const result = findRelationship(treeData, personName, relationship);
  console.log(
    `Relationship between ${personName} and ${relationship}: ${result}`
  );
  return (
    <div>
      <h1>Find Relationship</h1>
      <p>
        Relationship between {personName} and {relativeName}: {relationship}
      </p>
    </div>
  );
};

export default FindRelationship;
