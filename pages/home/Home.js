import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Card,
  Layout,
  Text,
  Icon,
  Input,
  Select,
  SelectItem,
  Divider,
  Button,
  IndexPath,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "../login/3rd-party";
import { color } from "react-native-reanimated";
import { API_URL } from "../../constant";
import { createAlert } from "../../components/Alert";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Location from "expo-location";

const ClockIcon = (props) => <Icon name="clock" {...props} />;

const AmountIcon = (props) => <Icon name="credit-card" {...props} />;

const NavigationIcon = (props) => <Icon name="navigation-2" {...props} />;

const CategoryIcon = (props) => <Icon name="menu-2" {...props} />;

const TagIcon = (props) => <Icon name="pricetags" {...props} />;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      duration: "00:00",
      showDurationError: true,
      prices: [
        {
          id: "€",
          label: "€: < 10€",
        },
        {
          id: "€€",
          label: "€€: < 15€",
        },
        {
          id: "€€€",
          label: "€€€: < 25€",
        },
        {
          id: "€€€€",
          label: "€€€€: > 26€",
        },
      ],
      selectedPrice: "",
      showPriceError: true,
      loading: false,
      subcategories: [],
      disableTags: true,
      restaurant_subcategory: 0,
      showSubcategoryError: true,
      selectedSubcategories: [],
      selectedSubcategoriesIndex: [],
      selectedSubcategoriesLabel: "",
      tags: [],
      showTagError: false,
      selectedTags: [],
      selectedTagsIndex: [],
      selectedTagsLabel: "",
      transports: [],
      showTransportError: true,
      selectedTransport: "",
      location_permission: false,
      location: {
        latitude: null,
        longitude: null,
      },
      disable: false,
      disableButton: false,
      datePicker: new Date("July 25, 1997 00:00:00"),
      show: false,
    };
  }
  async componentDidMount() {
    await this._getToken();
    await this._getFilters();
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Layout style={styles.formContainer} level="1">
          {this.state.loading == false ? (
            <></>
          ) : (
            <ActivityIndicator size="large" color="#FFA13D" />
          )}
          <Input
            disabled={this.state.loading}
            label="Durée maximum du parcours en heure"
            size="large"
            ref="timepicker"
            accessoryRight={ClockIcon}
            value={this.state.duration}
            onFocus={this.showDatePicker}
            onChange={this.showDatePicker}
            status={this.state.showDurationError ? "danger" : "success"}
            caption={
              this.state.showDurationError
                ? "La durée n'est pas valide (ex: 00:45). Saisir au minimum 45 minutes."
                : ""
            }
          />
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.datePicker}
              mode="time"
              display="spinner"
              locale="fr-FR"
              onChange={this.setDuration}
            />
          )}
          <Select
            disabled={this.state.loading}
            style={styles.input}
            placeholder="Catégorie de prix/personne"
            accessoryLeft={AmountIcon}
            value={this.state.selectedPrice.label}
            onSelect={(index) => this.setSelectedPrice(index)}
            size="large"
            status={this.state.showPriceError ? "danger" : "success"}
            caption={
              this.state.showPriceError
                ? "Veuillez sélectionner une catégorie de prix"
                : ""
            }
          >
            {this.state.prices.map((price, index) => (
              <SelectItem title={price.label} key={price.id} />
            ))}
          </Select>
          <Text></Text>
          <Text category="c2">
            Les prix peuvent être légèrement différent sur place.
          </Text>

          <Divider style={styles.divider} />

          <Select
            disabled={this.state.loading}
            style={styles.input}
            placeholder="Mode de transport"
            accessoryLeft={NavigationIcon}
            value={this.state.selectedTransport.label}
            onSelect={(index) => this.setSelectedTransport(index)}
            size="large"
            status={this.state.showTransportError ? "danger" : "success"}
            caption={
              this.state.showTransportError
                ? "Veuillez sélectionner un mode de transport"
                : ""
            }
          >
            {this.state.transports.map((transport) => (
              <SelectItem title={transport.label} key={transport.id} />
            ))}
          </Select>

          <Select
            disabled={this.state.loading}
            style={styles.input}
            placeholder="Catégorie d'activités souhaitées"
            accessoryLeft={CategoryIcon}
            size="large"
            multiSelect={true}
            value={this.state.selectedSubcategoriesLabel}
            onSelect={(index) => this.setSelectedSubcategories(index)}
            selectedIndex={this.state.selectedSubcategoriesIndex}
            status={this.state.showSubcategoryError ? "danger" : "success"}
            caption={
              this.state.showSubcategoryError
                ? "Veuillez sélectionner au moins une catégorie"
                : ""
            }
          >
            {this.state.subcategories.map((subcategories) => (
              <SelectItem title={subcategories.label} key={subcategories.id} />
            ))}
          </Select>
          <View>
            {!this.state.disableTags && (
              <Select
                show={false}
                disabled={this.state.loading}
                style={styles.input}
                placeholder="Type de cuisine"
                accessoryLeft={TagIcon}
                size="large"
                multiSelect={true}
                value={this.state.selectedTagsLabel}
                onSelect={(index) => this.setSelectedTags(index)}
                selectedIndex={this.state.selectedTagsIndex}
                status={this.state.showTagError ? "danger" : "success"}
                caption={
                  this.state.showTagError
                    ? "Veuillez sélectionner au moins un type de cuisine"
                    : ""
                }
              >
                {this.state.tags.map((tags) => (
                  <SelectItem title={tags.label} key={tags.id} />
                ))}
              </Select>
            )}
          </View>
        </Layout>
        <Button
          style={styles.searchButton}
          onPress={this._onSearch}
          size="giant"
          disable={this.state.loading || this.state.disableButton}
        >
          Générer un parcours !
        </Button>
      </KeyboardAvoidingView>
    );
  }

  showDatePicker = () => {
    this.setState({
      show: true,
    });
  };

  setDuration = (event, selectedTime) => {
    if (selectedTime === undefined) {
      this.setState({
        show: false,
        datePicker: selectedTime,
      });
    } else {
      let hours = selectedTime.getHours();
      let minutes = selectedTime.getMinutes();
      let showDurationError = false;

      if (hours == 0 && minutes < 45) showDurationError = true;

      hours < 10 ? (hours = "0" + hours) : false;
      minutes < 10 ? (minutes = "0" + minutes) : false;

      let duration = hours + ":" + minutes;

      this.setState({
        duration: duration,
        showDurationError: showDurationError,
        show: false,
        datePicker: selectedTime,
      });
    }
    this.refs.timepicker.blur();
  };

  setSelectedPrice = (value) => {
    this.setState({
      selectedPrice: this.state.prices[value.row],
      showPriceError: false,
    });
  };

  setSelectedTransport = (value) => {
    this.setState({
      selectedTransport: this.state.transports[value.row],
      showTransportError: false,
    });
  };

  setSelectedSubcategories = (values) => {
    let selectedSubcategories = [];
    let selectedSubcategoriesIndex = [];
    let selectedSubcategoriesLabel = "";
    values.forEach((value) => {
      let tmp_subcategory = this.state.subcategories[value.row];
      selectedSubcategories.push(tmp_subcategory);
      selectedSubcategoriesIndex.push(new IndexPath(value.row));
      selectedSubcategoriesLabel =
        selectedSubcategoriesLabel + tmp_subcategory.label + ", ";
    });
    let containesRestaurant = selectedSubcategories.includes(
      this.state.restaurant_subcategory
    );
    this.setState({
      selectedSubcategories: selectedSubcategories,
      selectedSubcategoriesIndex: selectedSubcategoriesIndex,
      selectedSubcategoriesLabel: selectedSubcategoriesLabel.slice(0, -2),
      disableTags: !containesRestaurant,
      showTagError: containesRestaurant,
    });
    selectedSubcategoriesLabel.length == 0
      ? this.setState({ showSubcategoryError: true })
      : this.setState({ showSubcategoryError: false });
  };

  setSelectedTags = (values) => {
    let selectedTags = [];
    let selectedTagsIndex = [];
    let selectedTagsLabel = "";

    values.forEach((value) => {
      let tmp_tag = this.state.tags[value.row];
      selectedTags.push(tmp_tag);
      selectedTagsIndex.push(new IndexPath(value.row));
      selectedTagsLabel = selectedTagsLabel + tmp_tag.label + ", ";
    });

    this.setState({
      selectedTags: selectedTags,
      selectedTagsIndex: selectedTagsIndex,
      selectedTagsLabel: selectedTagsLabel.slice(0, -2),
    });
    selectedTagsLabel.length == 0
      ? this.setState({ showTagError: true })
      : this.setState({ showTagError: false });
  };

  _getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    this.setState({
      token: token,
    });
  };

  _getFilters = async () => {
    this.setState({
      loading: true,
    });
    fetch(API_URL + "filters", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: this.state.token,
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        this.setState({
          loading: false,
        });
        if (!response.error) {
          let tmp_restaurant = response.subcategories.find(
            (subcategory) => subcategory.label === "Restaurant"
          );
          this.setState({
            subcategories: response.subcategories,
            tags: response.tags,
            transports: response.transports,
            restaurant_subcategory: tmp_restaurant,
          });
        } else {
          createAlert("Oups !", response.messages, false);
          this.setState({
            disableButton: true,
          });
        }
      })
      .catch((e) => {
        this.setState({
          loading: false,
        });
        console.error(e);
      });
  };

  _getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        location_permission: false,
      });
    }
    let location = await Location.getCurrentPositionAsync({}).catch((e) => {
      this.setState({
        loading: false,
        location: null,
      });
    });
    this.setState({
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  _onSearch = async () => {
    if (
      this.state.showPriceError ||
      this.state.showDurationError ||
      this.state.showSubcategoryError ||
      this.state.showTagError ||
      this.state.showTransportError
    ) {
      createAlert("Oups !", "Veuillez saisir tous les champs !", true);
    } else {
      this.setState({
        loading: true,
      });
      await this._getLocation();
      if (!this.state.location) {
        createAlert(
          "Oups !",
          "Veuillez autoriser la localisation afin de vous proposer un parcour près de vous !",
          true
        );
        this.setState({
          loading: false,
        });
      } else if (
        !this.state.location.latitude ||
        !this.state.location.longitude
      ) {
        this.setState({
          loading: false,
        });
        createAlert(
          "Oups ! ",
          "Nous n'arrivons pas à récupérer votre position ! \n Veuillez réessayer plus tard.",
          true
        );
      } else {
        fetch(API_URL + "search", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.state.token,
          },
          body: JSON.stringify({
            position: {
              longitude: this.state.location.longitude,
              latitude: this.state.location.latitude,
            },
            duration: this.getSecondes(this.state.duration),
            price: this.state.selectedPrice.id,
            transport: this.state.selectedTransport,
            tags: this.state.selectedTags,
            subcategories: this.state.selectedSubcategories,
          }),
        })
          .then((response) => response.json())
          .then(async (response) => {
            this.setState({
              loading: false,
            });
            if (!response.error) {
              let journeys = response.journeys;
              this.props.navigation.navigate("Journeys", {
                journeys: journeys,
                position: {
                  longitude: this.state.location.longitude,
                  latitude: this.state.location.latitude,
                },
              });
            } else {
              createAlert("Oups !", response.messages, false);
            }
          });
      }
    }
  };

  getSecondes = (value) => {
    let splitted = value.split(":");
    let hour = splitted[0] * 3600;
    let minute = splitted[1] * 60;
    return hour + minute;
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 75,
    backgroundColor: "#FFA13D",
  },
  filterLabel: {
    marginTop: 16,
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    marginTop: 18,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 16,
  },
  amount: {
    marginVertical: 16,
  },
  divider: {
    marginVertical: 22,
  },
  text: {
    margin: 2,
  },
  searchButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FFA13D",
    borderColor: "#FFA13D",
  },
});
