"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarProvider = exports.actionIds = void 0;
exports.useToolbar = useToolbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const element_1 = require("@wordpress/element");
const storage_1 = require("@debug-panel/storage");
const actions_registry_1 = require("../actions-registry");
/** These values are persisted in local storage **/
exports.actionIds = ['highlight', 'search'];
const ToolbarContext = (0, element_1.createContext)(null);
const ToolbarProvider = ({ children, variantId }) => {
    const [states, setStates] = (0, element_1.useState)({});
    const setState = (0, react_1.useCallback)((action, state) => {
        const { id, persist = false } = action;
        if (persist) {
            storage_1.store.setToolbarState(id, state);
        }
        setStates(prev => (Object.assign(Object.assign({}, prev), { [id]: state })));
    }, []);
    return ((0, jsx_runtime_1.jsx)(ToolbarContext.Provider, { value: { states, setState }, children: children }));
};
exports.ToolbarProvider = ToolbarProvider;
const useToolbarContext = () => {
    const ctx = (0, element_1.useContext)(ToolbarContext);
    if (!ctx) {
        throw new Error("useToolbarState must be used within ToolbarProvider");
    }
    return ctx;
};
function useToolbar(actions) {
    const { states, setState } = useToolbarContext();
    (0, element_1.useEffect)(() => {
        if (!actions) {
            return;
        }
        actions.forEach((action) => {
            if (action.persist) {
                const stored = storage_1.store.getToolbarState(action.id);
                if (stored) {
                    setState(action, stored);
                }
            }
        });
    }, []);
    if (!actions) {
        return (0, element_1.useMemo)(() => {
            return exports.actionIds.reduce((acc, id) => {
                return Object.assign(acc, {
                    [`is${capitalize(id)}Active`]: Boolean(states[id]),
                    [`set${capitalize(id)}Active`]: (active) => {
                        const action = (0, actions_registry_1.findAction)(id);
                        if (!action) {
                            throw Error("Cannot find action id defined in action ids");
                        }
                        return setState(action, active);
                    },
                });
            });
        }, [states]);
    }
    return {
        states,
        setState,
    };
}
const capitalize = (str) => {
    return (str.charAt(0).toUpperCase() + str.slice(1));
};
