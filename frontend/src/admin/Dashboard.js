function Dashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Users</h5>
            <p>120</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h5>Revenue</h5>
            <p>$5000</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;