import "./components.css";
function TableSkeletonLoader() {
  return (
    <div className="text-[1.7vw] max-sm:text-[2vw] w-[80%] max-sm:w-full m-auto flex justify-center ">
        
      <table className="table rounded-[10px] ">
        <thead>
          <tr>
            <th>
              {" "}
              <div className="headings"> User Name</div>
            </th>
            <th>
              {" "}
              <div className="headings"> Name</div>
            </th>
            <th>
              {" "}
              <div className="headings"> Email </div>
            </th>
            <th>
              {" "}
              <div className="headings"> Phone </div>
            </th>
            <th>
              {" "}
              <div className="headings"> Website</div>
            </th>
          </tr>
        </thead>
        <tbody>
         
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
          <tr className="row">
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
            <td className="td">
              <div className="loader"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeletonLoader;
