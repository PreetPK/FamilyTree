import React, { useState } from "react";

type AddChildProps = {
  treeData: FamilyTreeData;

  setFamilyTreeDataa: (data: FamilyTreeData) => void;
};

const AddChild: React.FC<AddChildProps> = ({
  treeData,
  setFamilyTreeDataa,
}) => {
  const [childName, setChildName] = useState({
    name: "",
    gender: "",
    mother: "",
  });

  const addChildToFamily = (treeData: FamilyTreeData, childName: any) => {
    if (childName.name.trim() === "") {
      return; // Don't add an empty child name
    }

    const mother = findPerson(treeData, childName.mother);

    if (mother) {
      const newChild: FamilyMember = {
        name: childName.name,
        gender: childName.gender, // or 'female', depending on the child's gender
        spouse: null,
        children: [],
      };

      mother.children.push(newChild);
      setChildName({ name: "", gender: "", mother: "" });
      setFamilyTreeDataa({ ...treeData });
    }
  };
  function findPerson(
    treeData: any,
    personName: string
  ): FamilyMember | undefined {
    function findRecursive(node: any): FamilyMember | undefined {
      console.log(node);
      console.log(personName);
      if (node.name === personName) {
        return node;
      }

      if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          const result = findRecursive(child);
          if (result) {
            return result;
          }
        }
      }

      return undefined;
    }

    return findRecursive(treeData.kingShan);
  }
  function collectMothers(node: any, mothers: string[]) {
    if (node.gender === "female") {
      mothers.push(node.name);
    }

    if (node.children) {
      for (const child of node.children) {
        collectMothers(child, mothers);
      }
    }
  }

  const mothers: string[] = [];
  collectMothers(treeData.kingShan, mothers);
  const handleAddChild = () => {
    if (childName.gender === "") {
      alert("Please select Gender");
    }
    if (childName.name.trim() !== "") {
      addChildToFamily(treeData, childName);
      setChildName({ name: "", gender: "", mother: "" });
    }
  };

  return (
    <div>
      <h1 className="paddBot">Add Child (Problem 2)</h1>
      <label>Select Mother:</label>
      <select
        className="inputWidth"
        style={{ marginLeft: "10px" }}
        value={childName.mother}
        onChange={(e) => setChildName({ ...childName, mother: e.target.value })}
      >
        <option value="">Select Mother</option>
        {mothers.map((mother: string) => (
          <option key={mother} value={mother}>
            {mother}
          </option>
        ))}
      </select>
      <br />
      <br />
      <label>Add Child Name:</label>

      <input
        style={{ width: "9%", marginLeft: "0px" }}
        type="text"
        placeholder="Child's Name"
        value={childName.name}
        onChange={(e) => setChildName({ ...childName, name: e.target.value })}
      />
      <br />
      <br />
      <label>Select Gender:</label>

      <select
        className="inputWidth"
        style={{ marginLeft: "10px" }}
        onChange={(e) => setChildName({ ...childName, gender: e.target.value })}
      >
        <option value={""}>Select Gender</option>
        <option value={"male"}>Male</option>
        <option value={"female"}>Female</option>
      </select>
      <br />
      <br />

      <button onClick={handleAddChild}>Add Child</button>
    </div>
  );
};

export default AddChild;
