import React, { useState } from "react";
import FamilyMember from "./pages/FamilyMember";
import familyTreeData from "./data/familyTreeData.json";
import Brothers from "./pages/Brothers";
import AddChild from "./pages/AddChild";
import FindRelationshipp from "./pages/Relation";

const App: React.FC = () => {
  const [familyTreeDataa, setFamilyTreeData] =
    useState<FamilyTreeData>(familyTreeData);

  function buildFamilyHierarchy(data: any): FamilyMember {
    const { name, gender, spouse, children } = data;
    const familyMember = new FamilyMember(name, gender, spouse);

    if (children && children.length > 0) {
      children.forEach((childData: any) => {
        const child = buildFamilyHierarchy(childData);
        familyMember.addChild(child);
      });
    }
    return familyMember;
  }

  const rootMember = buildFamilyHierarchy(familyTreeDataa.kingShan);

  const renderFamilyTree = (
    member: FamilyMember,
    level: number
  ): React.ReactNode => {
    if (!member) {
      return null;
    }

    return (
      <>
        <div className={`tree`}>
          <ul>
            <li>
              <p
                className={
                  member.gender === "male" ? "maleColor" : "femaleColor"
                }
              >
                {member.name}{" "}
                <span
                  className={
                    member.gender === "male" ? "femaleColor" : "maleColor"
                  }
                >
                  {member.spouse !== null && "- " + member.spouse}
                </span>
              </p>
              {member.children.length > 0 && (
                <ul>
                  {member.children.map((child: any, index: any) => (
                    <li key={index}>{renderFamilyTree(child, level + 1)}</li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Family Tree </h1>
      <div>
        {rootMember ? renderFamilyTree(rootMember, 0) : "Root member not found"}
      </div>
      <div style={{ clear: "both" }} />
      {familyTreeDataa ? (
        <div>
          <Brothers treeData={familyTreeDataa} />
          <AddChild
            treeData={familyTreeDataa}
            setFamilyTreeDataa={setFamilyTreeData}
          />
          {/* <FindRelationshipp
            treeData={familyTreeData}
            personName="Kriya"
            relativeName="Saayan"
          /> */}
        </div>
      ) : null}
    </div>
  );
};

export default App;
