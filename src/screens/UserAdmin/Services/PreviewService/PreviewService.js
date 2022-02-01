import React from 'react';

const PreviewService = (props) => {
    
    const { service } = props;

    console.log(service);

    const returnCurrentMonth = (d) => {
		return new Date(d).toLocaleString('default', { month: 'short' })
        + ' ' + new Date(d).getFullYear()
	};

    return(

        <div className="app-flex-column">

            <div className="app-flex-row align-items-start justify-content-between">

                <div className="w-100"> 
                    {service?.data?.about} <br /><br />

                    <span className="text-lightSecondary">
                        Promotion Validity: <br />
                        { returnCurrentMonth(service?.data?.startDate) + ' - ' + returnCurrentMonth(service?.data?.endDate) }
                    </span>

                </div>
                <img alt="" src={ service?.data?.images[0]?.src } width="100%" height="200px" />

            </div>

            <h4 className="text-right w-100"> $ { service?.data?.price } </h4>

            <h6 className="text-right w-100"> for { service?.data?.durationDays } days </h6>

        </div>

    );

}
 
export default PreviewService;