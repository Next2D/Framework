import "@next2d/player";
import {
    View,
    ViewModel
} from "../../src";

describe("ViewModelTest", () =>
{
    test("bind call test", () =>
    {
        const view: View = new View();
        const viewModel: ViewModel = new ViewModel();

        viewModel
            .bind(view)
            .then((result) =>
            {
                expect(result instanceof View).toBe(true);
            });

    });

    test("unbind call test", () =>
    {
        const viewModel: ViewModel = new ViewModel();
        expect(viewModel.unbind(new View())).toBe(undefined);
    });

    test("factory call test", () =>
    {
        const view: View = new View();
        const viewModel: ViewModel = new ViewModel();

        viewModel
            .factory(view)
            .then((result) =>
            {
                expect(result instanceof View).toBe(true);
            });
    });
});