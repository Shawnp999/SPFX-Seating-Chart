import * as React from 'react';
import styles from "../SeatingMap.module.scss";

interface EmptyHalfSectionProps {
    text?: string;
}

const EmptyHalfSection: React.FC<EmptyHalfSectionProps> = ({text}) => {

    let sectionClassName = '';
    let classPositioning = ''

    switch (text) {
        case 'Womans Bathroom' :
            sectionClassName = styles.femaleBathroom ;
            classPositioning = styles.centerElement ;

            break;

        case 'Mens Bathrooms' :
            sectionClassName = styles.maleBathroom
            classPositioning = styles.centerElement ;
            break;

        case 'Kitchen' :
            sectionClassName = styles.kitchen
            classPositioning = styles.positionBottom ;
            break;

        default:
            sectionClassName = '';
            break;
    }


    return (


        <div className={`${styles.halfSection} ${classPositioning}`}>

            <div className={sectionClassName}>
                {text && <p className={styles.displayNone}>{text}</p>}
            </div>

        </div>


    );
};

export default EmptyHalfSection;
