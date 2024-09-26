<div className="w-4/5 pt-5 flex gap-x-5 ml-5">
        {/* {['Not Contacted', 'Warm Lead', 'Attempted', 'Registered', 'Opportunity', 'Cold Leads'].map((label, index) => (
          <div key={index} className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>{label}</h1>
              <h1 className="font-bold">{index * 10 + 1}</h1> 
            </div>
          </div>
        ))} */}
        <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Not Contacted</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Not Contacted'  ).length  }</h1> 
            </div>
        </div>
        <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Attempted</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Attempted').length }</h1> 
            </div>
        </div>
        <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Warm Lead</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Warm Lead').length }</h1> 
            </div>
        </div>
        {/* <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Not Contacted</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Not Contacted').length }</h1> 
            </div>
        </div> */}
        <div className="w-1/6 bg-white border rounded flex justify-center items-center gap-x-2 text-center h-16">
            <div>
              <h1>
                <FontAwesomeIcon icon={faUserGroup} className="text-2xl text-[#3B2BBF]" />
              </h1>
            </div>
            <div>
              <h1>Cold Leads</h1>
              <h1 className="font-bold">{records.filter(record => record.status === 'Cold Lead').length }</h1> 
            </div>
        </div>
      </div>