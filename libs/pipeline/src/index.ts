type PipelineBuilder<TInput, TOutput = TInput> = {
    pipe: <TNext>( fn: ( data: TOutput ) => TNext ) => PipelineBuilder<TInput, TNext>;
    build: () => ( data: TInput ) => TOutput;
};

export const createPipeline = <TInput>(): PipelineBuilder<TInput> => {
    const steps: Array<( data: any ) => any> = [];

    const builder: PipelineBuilder<TInput, TInput> = {
        pipe( fn ) {
            steps.push( fn );
            return builder as any;
        },
        build() {
            return ( data: TInput ) =>
                steps.reduce( ( acc, fn ) => fn( acc ), data );
        },
    };

    return builder;
};
