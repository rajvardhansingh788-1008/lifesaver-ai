import './AnimationLayer.css';

export default function AnimationLayer({ disasterType, isActive = true }) {
  if (!isActive) return null;

  return (
    <div className={`animation-layer ${disasterType}`}>
      {disasterType === 'fire' && (
        <>
          <div className="fire-effect">
            <div className="flame-particle f1"></div>
            <div className="flame-particle f2"></div>
            <div className="flame-particle f3"></div>
            <div className="flame-particle f4"></div>
          </div>
          <div className="smoke-effect">
            <div className="smoke-particle s1"></div>
            <div className="smoke-particle s2"></div>
            <div className="smoke-particle s3"></div>
          </div>
          <div className="glow-effect fire-glow"></div>
        </>
      )}

      {disasterType === 'earthquake' && (
        <>
          <div className="earthquake-shake">
            <div className="crack-effect">
              <div className="crack c1"></div>
              <div className="crack c2"></div>
              <div className="crack c3"></div>
            </div>
            <div className="debris-effect">
              <div className="debris d1"></div>
              <div className="debris d2"></div>
              <div className="debris d3"></div>
            </div>
          </div>
        </>
      )}

      {disasterType === 'flood' && (
        <>
          <div className="water-effect">
            <div className="wave w1"></div>
            <div className="wave w2"></div>
            <div className="wave w3"></div>
            <div className="water-overlay"></div>
          </div>
          <div className="rain-effect">
            <div className="rain-particle r1"></div>
            <div className="rain-particle r2"></div>
            <div className="rain-particle r3"></div>
            <div className="rain-particle r4"></div>
            <div className="rain-particle r5"></div>
          </div>
        </>
      )}
    </div>
  );
}
