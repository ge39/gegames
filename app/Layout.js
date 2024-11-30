export default function Layout({ children }) {
    return (
      <div style={{ padding: '20px', border: '2px solid #ccc' }}>
        <header>
          <h2>Gegames Layout</h2>
        </header>
        <main>{children}</main>
      </div>
    );
  }
  