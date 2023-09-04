import React, { useState } from "react";

type RelationshipProps = {
  treeData: FamilyTreeData;
};

type RelationshipOption = {
  label: string;
  value: string;
};

const RelationshipDropdown: React.FC<RelationshipProps> = ({ treeData }) => {
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [selectedRelationship, setSelectedRelationship] = useState<string>("");
  const [selectedResult, setSelectedResult] = useState<any>([]);
  const [relationships, setRelationships] = useState<RelationshipOption[]>([]);
  const populateRelationships = (selectedPersonName: string) => {
    const availableRelationships: RelationshipOption[] = [
      { label: "Brothers", value: "male" },
      { label: "Sisters", value: "female" },
    ];

    setRelationships(availableRelationships);
  };

  // Handle person selection
  const handlePersonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPersonName = event.target.value;
    setSelectedPerson(selectedPersonName);
    populateRelationships(selectedPersonName);
  };

  const handleRelationshipChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRelationship = event.target.value;
    setSelectedRelationship(selectedRelationship);

    const relatedMembers = findRelationship(
      selectedPerson,
      selectedRelationship
    );
    console.log(relatedMembers);

    if (Array.isArray(relatedMembers)) {
      setSelectedResult(relatedMembers);
    } else {
      setSelectedResult([]);
    }
  };

  const findRelationship = (
    selectedPersonName: string,
    selectedRelationship: string
  ): string[] => {
    const brothersAndSisters: string[] = [];

    const kingShan = treeData.kingShan;

    if (kingShan && kingShan.children) {
      const selectedPerson = kingShan.children.find(
        (child: any) => child.name === selectedPersonName
      );
      console.log(selectedPerson);
      if (selectedPerson) {
        kingShan.children.forEach((child: any) => {
          if (
            child.name !== selectedPersonName &&
            child.gender === selectedRelationship
          ) {
            brothersAndSisters.push(child.name);
          }
        });
      }
    }

    return brothersAndSisters;
  };

  return (
    <div>
      <h1 className="paddBot">Find Brother & Sister (Problem 1)</h1>
      <label htmlFor="selectPerson">Select Person:</label>
      <select
        id="selectPerson"
        value={selectedPerson}
        onChange={handlePersonChange}
        className="inputWidth"
        style={{ marginLeft: "37px" }}
      >
        <option value="">Select Person</option>
        {treeData.kingShan.children.map((child: any) => (
          <option key={child.name} value={child.name}>
            {child.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <label htmlFor="relationshipSelect">Select Relationship:</label>
      <select
        id="relationshipSelect"
        value={selectedRelationship}
        onChange={handleRelationshipChange}
        style={{ marginLeft: "5px" }}
      >
        <option value="">Select Relationship</option>
        {relationships &&
          relationships.map((relationshipOption: any) => (
            <option
              key={relationshipOption.value}
              value={relationshipOption.value}
            >
              {relationshipOption.label}
            </option>
          ))}
      </select>
      {selectedResult.length > 0 && (
        <p style={{ margin: "10px" }}>
          {" "}
          <b>{"Solution:"}</b> <span>{selectedResult.join(", ")}</span>
        </p>
      )}
    </div>
  );
};

export default RelationshipDropdown;
