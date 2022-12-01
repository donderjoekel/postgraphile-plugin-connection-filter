const { version } = require("../package.json");

export const PgConnectionArgFilterRecordFunctionsPlugin: GraphileConfig.Plugin =
  {
    name: "PgConnectionArgFilterRecordFunctionsPlugin",
    version,

    // Note from Benjie:
    // I don't think we actually need this any more, since "record returning
    // functions" aren't really any different to regular functions, except that
    // the codec isAnonymous. If we're careful to allow anonymous codecs in the
    // relevant places it should be fine.

    /*
    schema: {
      hooks: {
        GraphQLInputObjectType_fields(fields, build, context) {
          const { extend, sql, inflection, connectionFilterOperatorsType } =
            build;
          const {
            fieldWithHooks,
            scope: { pgCodec: codec, isPgConnectionFilter },
            Self,
          } = context as Context<GraphQLInputFieldConfigMap> & {
            scope: {
              pgIntrospection: PgClass | PgProc;
              isPgConnectionFilter?: boolean;
            };
          };

          if (!isPgConnectionFilter || proc.kind !== "procedure") return fields;

          connectionFilterTypesByTypeName[Self.name] = Self;

          // Must return a `RECORD` type
          const isRecordLike = proc.returnTypeId === "2249";
          if (!isRecordLike) return fields;

          // Must be marked @filterable OR enabled via plugin option
          if (!(proc.tags.filterable || connectionFilterSetofFunctions))
            return fields;

          const argModesWithOutput = [
            "o", // OUT,
            "b", // INOUT
            "t", // TABLE
          ];
          const outputArgNames = proc.argTypeIds.reduce(
            (prev: string[], _, idx) => {
              if (argModesWithOutput.includes(proc.argModes[idx])) {
                prev.push(proc.argNames[idx] || "");
              }
              return prev;
            },
            []
          );
          const outputArgTypes = proc.argTypeIds.reduce(
            (prev: PgType[], typeId, idx) => {
              if (argModesWithOutput.includes(proc.argModes[idx])) {
                prev.push(introspectionResultsByKind.typeById[typeId]);
              }
              return prev;
            },
            []
          );

          const outputArgByFieldName = outputArgNames.reduce(
            (
              memo: { [fieldName: string]: { name: string; type: PgType } },
              outputArgName,
              idx
            ) => {
              const fieldName = inflection.functionOutputFieldName(
                proc,
                outputArgName,
                idx + 1
              );
              if (memo[fieldName]) {
                throw new Error(
                  `Tried to register field name '${fieldName}' twice in '${describePgEntity(
                    proc
                  )}'; the argument names are too similar.`
                );
              }
              memo[fieldName] = {
                name: outputArgName,
                type: outputArgTypes[idx],
              };
              return memo;
            },
            {}
          );

          const outputArgFields = Object.entries(outputArgByFieldName).reduce(
            (memo, [fieldName, outputArg]) => {
              const OperatorsType = connectionFilterOperatorsType(
                newWithHooks,
                outputArg.type.id,
                null
              );
              if (!OperatorsType) {
                return memo;
              }
              return extend(memo, {
                [fieldName]: fieldWithHooks(
                  fieldName,
                  {
                    description: `Filter by the object’s \`${fieldName}\` field.`,
                    type: OperatorsType,
                  },
                  {
                    isPgConnectionFilterField: true,
                  }
                ),
              });
            },
            {}
          );

          const resolve: ConnectionFilterResolver = ({
            sourceAlias,
            fieldName,
            fieldValue,
            queryBuilder,
          }) => {
            if (fieldValue == null) return null;

            const outputArg = outputArgByFieldName[fieldName];

            const sqlIdentifier = sql.query`${sourceAlias}.${sql.identifier(
              outputArg.name
            )}`;

            const typeName = pgGetGqlTypeByTypeIdAndModifier(
              outputArg.type.id,
              null
            ).name;
            const filterTypeName = inflection.filterType(typeName);

            return connectionFilterResolve(
              fieldValue,
              sqlIdentifier,
              filterTypeName,
              queryBuilder,
              outputArg.type,
              null,
              fieldName
            );
          };

          for (const fieldName of Object.keys(outputArgFields)) {
            connectionFilterRegisterResolver(Self.name, fieldName, resolve);
          }

          return extend(fields, outputArgFields);
        },
      },
    },
    */
  };
