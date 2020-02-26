import React, { useContext } from "react";
import RouteContext, { getRoute } from "../common/RouteStoreContext";

export default function MutatorSection({ children }) {
  const { state } = useContext(RouteContext);
  return (
    <section className="mutator-section">
      {children({ route: getRoute(state) })}
    </section>
  );
}
