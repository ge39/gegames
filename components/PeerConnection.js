return (
  <div
    ref={boxRef}
    className="fixed bottom-4 right-4 z-50 w-64 rounded-lg shadow-lg bg-white border border-gray-300"
    style={{ touchAction: "none" }}
    onMouseDown={onMouseDown}
    onTouchStart={onTouchStart}
    onTouchMove={onTouchMove}
    onTouchEnd={onTouchEnd}
  >
    <div className="header bg-gray-100 p-2 flex justify-between items-center cursor-move rounded-t-lg">
      <span className="text-sm font-semibold">Conexão P2P</span>
      <button onClick={() => setMinimized(!minimized)} className="text-gray-500 text-sm">
        {minimized ? "🔼" : "🔽"}
      </button>
    </div>

    {!minimized && (
      <div className="p-3 flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <label className="text-gray-700">Seu ID:</label>
          <span className="bg-gray-100 px-2 py-1 rounded font-mono text-xs">{myPeerId}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(myPeerId);
              alert("ID copiado!");
            }}
            className="text-blue-500 text-xs"
          >
            Copiar
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 whitespace-nowrap">ID do amigo:</label>
          <input
            type="text"
            value={remoteId}
            onChange={(e) => setRemoteId(e.target.value)}
            placeholder={`Ex: ${myPeerId}`}
            className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={toggleCamera}
            className={`flex-1 px-2 py-1 rounded text-xs ${
              cameraOn ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            {cameraOn ? "Desligar câmera" : "Ligar câmera"}
          </button>
          <button
            onClick={connectToPeer}
            className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-xs"
          >
            Conectar
          </button>
        </div>

        {connected && (
          <div className="mt-2">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-32 bg-black rounded"
            />
          </div>
        )}
      </div>
    )}
  </div>
);
