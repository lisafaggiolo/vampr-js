class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }
  
    /** Simple tree methods **/
  
    // Adds the vampire as an offspring of this vampire
    addOffspring(vampire) {
      this.offspring.push(vampire)
      vampire.creator = this;
    }
  
    // Returns the total number of vampires created by that vampire
    get numberOfOffspring() {
      return this.offspring.length
    }
  
    // Returns the number of vampires away from the original vampire this vampire is
    get numberOfVampiresFromOriginal() {
      let numOfAncestors = 0;
      let descendant = this;
      
      if (descendant.creator === null){
        return numOfAncestors;
      } else {
        while (descendant.creator) {
          descendant = descendant.creator;
          numOfAncestors++
        }
      }
      return numOfAncestors;
    }
  
    // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
    isMoreSeniorThan(vampire) {
  
      let vampireAncestors = vampire.numberOfVampiresFromOriginal
      let thisAncestors = this.numberOfVampiresFromOriginal

      if (thisAncestors < vampireAncestors) {
        return true;
      } else {
        return false;
      }
    }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (this.name === name) {
      return this 
    }
    
    for (const tinyOffSpring of this.offspring) {
      const offSpringWithName = tinyOffSpring.vampireWithName(name);

      if (offSpringWithName) {
        return offSpringWithName
      }
    }
    
  return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

    let total = 0;
    for (const tinyOffspring of this.offspring) {
      total++
      total += tinyOffspring.totalDescendents;
    }
    return total;
    
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenials = [];

    if (this.yearConverted > 1980) {
      millenials.push(this);
    }
    for (const potentialMillies of this.offspring) {
      millenials = millenials.concat(potentialMillies.allMillennialVampires)
    }

    console.log(millenials)
    return millenials;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

