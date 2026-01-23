# 📊 Mosquito Breeding Risk Model (References)

This project uses a **weighted environmental risk model** to estimate mosquito breeding risk.  
Each factor is supported by **trusted public-health or scientific literature**, and the weights reflect the **relative biological importance** of each condition.



## 1) Standing Water (Weight: 40)

### Reference  
**CDC – Life Cycle of Mosquitoes**  
> “Mosquitoes lay eggs on or near water surfaces. Larvae and pupae are aquatic and require standing water to develop.”  
Source: https://www.cdc.gov/mosquitoes/about/life-cycle-of-aedes-mosquitoes.html

### Justification  
Standing water is a **mandatory condition** for mosquito breeding.  
Without water, eggs cannot hatch and larvae cannot survive.  
Therefore, this factor is given the **highest weight** in the risk model.

---

## 2) Soil Moisture (Weight: 25)

### Reference  
**WHO – Operational Guide for Assessing Productivity of Aedes aegypti Breeding Sites**  
Mosquito larvae are commonly found in areas where water accumulates due to **poor drainage, damp surroundings, and container habitats**.  
Source: https://tdr.who.int/publications/m/item/2011-10-31-operational-guide-for-assessing-the-productivity-of-aedes-aegypti-breeding-sites

### Justification  
Soil moisture does not directly cause breeding, but it is a strong **environmental indicator** of:
- Poor drainage  
- Persistent dampness  
- Likelihood of hidden stagnant water  

Hence, it is treated as a **secondary but significant risk factor**.

---

## 3) Temperature (Weight: 20)

### Reference  
Campbell et al., *“The Complex Relationship between Weather and Dengue”*  
 Adult mosquito survival and larval development rate are strongly temperature-dependent, with optimal ranges near **25–35°C** facilitating rapid lifecycle progression.  
Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3854883/

### Justification  
Temperature affects:
- Speed of egg hatching  
- Larval growth rate  
- Adult survival  

However, temperature alone cannot create breeding without water, so it is given a **moderate weight** rather than the maximum.

---

## 4) Humidity (Weight: 15)

### Reference  
Morin et al., *Climate and Viral Transmission: The Influence of Humidity*  
Relative humidity significantly affects **adult mosquito survival and activity**, with higher humidity increasing lifespan and biting behavior.  
(Also supported by findings in Campbell et al., PMC3854883)

### Justification  
Humidity improves mosquito survival but does **not initiate breeding**.  
It is therefore treated as a **supporting environmental factor** and assigned the lowest weight.

---

## 🧠 Important Design Note

The numeric weights (40, 25, 20, 15) are **engineering design parameters**, not biological constants.

They are:
- Based on relative biological importance reported in literature  
- Designed for interpretability on a 0–100 scale  
- Fully **configurable and tunable** for future calibration using field data  

This approach follows standard practice in:
- Environmental risk modeling  
- Public health early-warning systems  
- IoT-based monitoring systems  

