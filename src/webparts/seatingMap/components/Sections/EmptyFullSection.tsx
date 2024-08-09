import * as React from 'react';
import styles from '../SeatingMap.module.scss';

interface EmptyFullSectionProps {
    text?: string;
}

const EmptyFullSection: React.FC<EmptyFullSectionProps> = ({text}) => {
    let sectionClassName = '';
    let classPositioning = ''

    // Use case-based assignment for class names
    switch (text) {
        case 'Elevators':
            sectionClassName = styles.ElevetorsImg;
            break;

        case 'Womans Bathroom' :
            sectionClassName = styles.femaleBathroom
            break;

        case 'Taken space' :
            sectionClassName = styles.takenSpaceImg
            break;

        case 'Mens Bathrooms' :
            sectionClassName = styles.maleBathroom
            break;

        case 'stairs' :
            sectionClassName = styles.leftStairs
            classPositioning = styles.positionLeft ;
            break;

        case 'Stairs' :
            sectionClassName = styles.rightStairs
            classPositioning = styles.positionRight
            break;


        default:
            sectionClassName = '';
            break;
    }

    return (
        <div className={`${styles.fullSection} ${classPositioning}`}>

            <div className={sectionClassName}>
                {text && <p className={styles.displayNone}>{text}</p>}
            </div>

        </div>
    );
};

export default EmptyFullSection;
