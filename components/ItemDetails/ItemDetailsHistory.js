import React from 'react';

const ItemDetailsHistory = ({ bids }) => {
  console.log("Nidsd", bids)
  return (
    <>
      <div className='item-details-content'>
        <h3>History</h3>
        <div className='item-details-into'>
          <div className='row'>
            {bids?.length > 0 ? bids?.map((bid) => (

              <div
                key={bid?.id}
                className='col-lg-12'>
                <div className='item-details-card'>
                  <div className='item-details-card-img'>
                    <img
                      src=
                      {bid?.created_user_photo ? bids?.created_user_photo : '../images/Item-details/Item-details2.jpg'}
                      alt='Images'
                    />
                    <i className='ri-check-line'></i>
                  </div>
                  <div className='item-details-card-content'>
                    <h3>
                      Bid Placed For <b>{bid?.cryptoCost} ETH</b>
                    </h3>
                    <span>@{bid?.created_by}</span>
                  </div>
                  <div className='work-hours'>{bid?.created_at}</div>
                </div>
              </div>
            )) : (
              <>
                <hr style={{ color: 'white' }}></hr>
                <h3>No Bid Placed</h3>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailsHistory;
